/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Add this import
import { toast } from "sonner";
import { UserService, User } from "@/src/services/user/userServiceActions";
import BlockOrDeleteConfirmation from "@/src/components/BlockOrCancelOrDeleteConfirmation";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import GetPagination from "@/src/utils/GetPagination";
import { Check, Ban, Trash2, RotateCcw, Eye } from "lucide-react";

// Define types - Update if your User type doesn't include DELETED
type UserStatus = "ACTIVE" | "INACTIVE" | "DELETED";
type UserRole = "ADMIN" | "GUIDE" | "TOURIST";

// If your imported User type doesn't include DELETED, create a local type
interface LocalUser extends Omit<User, 'status'> {
  status: UserStatus;
}

export default function ManageUser() {
  const router = useRouter(); // Initialize router
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all");
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Store selected status and role for each user
  const [userSelections, setUserSelections] = useState<Record<string, {
    status: UserStatus;
    role: UserRole;
  }>>({});

  const usersPerPage = 5;

  // Load users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await UserService.getAllUsers();
      // Cast to LocalUser type if needed
      const localUsers: LocalUser[] = allUsers.map(user => ({
        ...user,
        status: user.status as UserStatus // Cast to include DELETED
      }));
      setUsers(localUsers);
      
      // Initialize selections
      const selections: Record<string, { status: UserStatus; role: UserRole }> = {};
      localUsers.forEach(user => {
        selections[user.id] = {
          status: user.status,
          role: user.role as UserRole
        };
      });
      setUserSelections(selections);
    } catch (err: any) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUserSelections(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        status: newStatus
      }
    }));
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUserSelections(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        role: newRole
      }
    }));
  };

  const handleUpdateUser = async (userId: string) => {
    const selections = userSelections[userId];
    if (!selections) return;
    
    const toastId = toast.loading(`Updating user...`);
    try {
      await UserService.updateUserRoleOrStatus(userId, {
        status: selections.status,
        role: selections.role
      });
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              status: selections.status,
              role: selections.role
            };
          }
          return user;
        })
      );
      
      toast.success(`User updated!`, { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to update user", { id: toastId });
    }
  };

  // Handle row click to navigate to user details
  const handleRowClick = (userId: string, e: React.MouseEvent) => {
    // Prevent navigation if clicking on select or button elements
    const target = e.target as HTMLElement;
    if (
      target.closest('select') || 
      target.closest('button') || 
      target.closest('[role="combobox"]')
    ) {
      return;
    }
    
    router.push(`/dashboard/admin/manage-user/user-details/${userId}`);
  };

  // Add view details button handler
  const handleViewDetails = (userId: string) => {
    router.push(`/dashboard/admin/manage-user/user-details/${userId}`);
  };

  const filteredUsers =
    selectedRoleFilter && selectedRoleFilter !== "all"
      ? users.filter((user) => user.role.toLowerCase() === selectedRoleFilter.toLowerCase())
      : users;

  const totalFiltered = filteredUsers.length;
  const totalPage = Math.ceil(totalFiltered / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-5">
      {/* Header */}
      <div className="flex justify-between my-8">
        <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 uppercase mb-24">
          USER: {users.length}
        </h1>

        {/* Role filter */}
        <div className="w-48 flex justify-between items-center align-middle gap-2">
          <Label className="font-semibold uppercase">Filter by Role</Label>
          <Select onValueChange={(value) => setSelectedRoleFilter(value)} value={selectedRoleFilter || "all"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter Roles</SelectLabel>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="GUIDE">Guide</SelectItem>
                <SelectItem value="TOURIST">Tourist</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-muted rounded-md">
        <Table className="bg-gray-50 dark:bg-gray-900">
          <TableHeader className="bg-blue-200 dark:bg-blue-900">
            <TableRow>
              <TableHead className="uppercase font-bold border-r-2">No.</TableHead>
              <TableHead className="uppercase font-bold">Name</TableHead>
              <TableHead className="uppercase font-bold">Email</TableHead>
              <TableHead className="uppercase font-bold">Current Role</TableHead>
              <TableHead className="uppercase font-bold text-center">Current Status</TableHead>
              <TableHead className="uppercase font-bold border-l-2 text-center">Update Status</TableHead>
              <TableHead className="uppercase font-bold border-l-2 text-center">Update Role</TableHead>
              <TableHead className="uppercase font-bold border-l-2 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-gray-50 dark:bg-gray-900">
            {currentUsers.map((user, index) => {
              // Get the selected status and role for this user
              const selectedStatus = userSelections[user.id]?.status || user.status;
              const selectedRole = userSelections[user.id]?.role || user.role;

              return (
                <TableRow
                  key={user.id}
                  onClick={(e) => handleRowClick(user.id, e)}
                  onMouseEnter={() => setHoveredRow(user.id)}
                  onMouseLeave={() => {
                    setActiveRow(null);
                    setHoveredRow(null);
                  }}
                  className={`cursor-pointer ${
                    user.status === "DELETED" ? 'bg-red-50 dark:bg-red-900/20' :
                    activeRow === user.id
                      ? "bg-blue-500 dark:bg-gray-600"
                      : "hover:bg-blue-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  <TableCell className="font-medium border-r-2">
                    {(currentPage - 1) * usersPerPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div>
                        {user.name}
                        {user.status === "DELETED" && (
                          <span className="ml-2 text-xs text-red-500 font-semibold">(Deleted)</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  
                  {/* Current Role */}
                  <TableCell className="font-medium">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'GUIDE' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  
                  {/* Current Status */}
                  <TableCell className="font-medium text-center">
                    {user.status === "DELETED" ? (
                      <div className="flex items-center justify-center gap-1">
                        <Trash2 className="text-red-500" size={16} />
                        <span className="text-red-600 text-sm font-semibold">DELETED</span>
                      </div>
                    ) : user.status === "ACTIVE" ? (
                      <div className="flex items-center justify-center gap-1">
                        <Check className="text-green-500" size={16} />
                        <span className="text-green-600 text-sm">ACTIVE</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <Ban className="text-orange-500" size={16} />
                        <span className="text-orange-600 text-sm">INACTIVE</span>
                      </div>
                    )}
                  </TableCell>

                  {/* Update Status Selector */}
                  <TableCell className="border-l-2">
                    <Select
                      value={selectedStatus}
                      onValueChange={(val) => handleStatusChange(user.id, val as UserStatus)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>User Status</SelectLabel>
                          <SelectItem value="ACTIVE" className="text-green-600">
                            <div className="flex items-center gap-2">
                              <Check size={14} /> ACTIVE
                            </div>
                          </SelectItem>
                          <SelectItem value="INACTIVE" className="text-orange-600">
                            <div className="flex items-center gap-2">
                              <Ban size={14} /> INACTIVE
                            </div>
                          </SelectItem>
                          <SelectItem value="DELETED" className="text-red-600">
                            <div className="flex items-center gap-2">
                              <Trash2 size={14} /> DELETE
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Update Role Selector */}
                  <TableCell className="border-l-2">
                    <Select
                      value={selectedRole}
                      onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>User Role</SelectLabel>
                          <SelectItem value="ADMIN" className="text-purple-600">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                              ADMIN
                            </div>
                          </SelectItem>
                          <SelectItem value="GUIDE" className="text-blue-600">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                              GUIDE
                            </div>
                          </SelectItem>
                          <SelectItem value="TOURIST" className="text-green-600">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500"></span>
                              TOURIST
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="border-l-2">
                    <div className="flex gap-2 justify-center">
                      {/* View Details Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(user.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="View User Details"
                      >
                        <Eye size={16} />
                      </Button>

                      {/* Update/Restore/Delete Button */}
                      {user.status === "DELETED" ? (
                        <BlockOrDeleteConfirmation
                          onConfirm={() => {
                            // For restoring, we'll update status to ACTIVE
                            handleStatusChange(user.id, "ACTIVE");
                            handleUpdateUser(user.id);
                          }}
                          actionType="restore"
                          customTitle={`Restore User: ${user.email}`}
                          customDescription="Are you sure you want to restore this user?"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-300"
                          >
                            <RotateCcw size={16} className="mr-1" />
                            Restore
                          </Button>
                        </BlockOrDeleteConfirmation>
                      ) : selectedStatus !== user.status || selectedRole !== user.role ? (
                        <BlockOrDeleteConfirmation
                          onConfirm={() => handleUpdateUser(user.id)}
                          actionType={selectedStatus === "DELETED" ? "delete" : "update"}
                          customTitle={
                            selectedStatus === "DELETED" 
                              ? `Delete User: ${user.email}`
                              : `Update ${user.email}`
                          }
                          customDescription={
                            selectedStatus === "DELETED"
                              ? "Are you sure you want to delete this user? This action cannot be undone."
                              : undefined
                          }
                        >
                          <Button
                            variant={selectedStatus === "DELETED" ? "destructive" : "outline"}
                            size="sm"
                            className={
                              selectedStatus === "DELETED"
                                ? "hover:bg-red-700"
                                : "text-blue-500 hover:bg-blue-600 hover:text-white"
                            }
                          >
                            {selectedStatus === "DELETED" ? (
                              <>
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </>
                            ) : (
                              "Update"
                            )}
                          </Button>
                        </BlockOrDeleteConfirmation>
                      ) : (
                        <Button
                          variant={"ghost"}
                          size="sm"
                          disabled
                          className="text-gray-400"
                        >
                          No changes
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalFiltered > usersPerPage && totalPage > 1 && (
        <div className="flex justify-center mt-10">
          <GetPagination
            totalItems={totalFiltered}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={usersPerPage}
          />
        </div>
      )}
    </div>
  );
}