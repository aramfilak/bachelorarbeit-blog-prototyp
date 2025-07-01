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
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { BlogResponse } from "@/types/blog";

type DeleteButtonProps = {
  children: React.ReactNode;
  blogId: number;
};

const DeleteButton = ({ children, blogId }: DeleteButtonProps) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blog/${blogId}`,
        {
          method: "DELETE",
        }
      );
      const { message, success, error } = (await res.json()) as BlogResponse;
      if (success) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message, { description: error });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <AlertDialogAction onClick={handleDelete}>
            Ja, löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export function BlogActions({ blogId }: { blogId: number }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog/${blogId}/edit`);
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={handleEdit}>
              <Pencil className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bearbeiten</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DeleteButton blogId={blogId}>
                <Button variant="ghost">
                  <Trash2 className="size-4" />
                </Button>
              </DeleteButton>
            </div>
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
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="size-4" />
            Bearbeiten
          </DropdownMenuItem>
          <DeleteButton blogId={blogId}>
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
