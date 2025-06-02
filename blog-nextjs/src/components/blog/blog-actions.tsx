"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DeleteButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Löschen</AlertDialogTitle>
          <AlertDialogDescription>
            Sind Sie sicher, dass Sie diesen Blog löschen möchten?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction>Ja, löschen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export function BlogActions() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Pencil className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bearbeiten</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <DeleteButton>
              <Button variant="ghost">
                <Trash2 className="size-4" />
              </Button>
            </DeleteButton>
          </TooltipTrigger>
          <TooltipContent>Löschen</TooltipContent>
        </Tooltip>
      </div>

      {/* Mobile */}
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden" asChild>
          <Button>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44 md:hidden">
          <DropdownMenuItem>
            <Pencil className="size-4" />
            Bearbeiten
          </DropdownMenuItem>
          <DeleteButton>
            <DropdownMenuItem
              className="hover:text-destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 className="size-4" />
              Löschen
            </DropdownMenuItem>
          </DeleteButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
