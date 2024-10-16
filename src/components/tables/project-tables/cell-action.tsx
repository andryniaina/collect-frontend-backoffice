"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/data/const/data";
import {
  Edit,
  MoreHorizontal,
  Trash,
  PieChart,
  MapPinned,
  Earth,
  Share,
  Copy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteForm } from "@/services/application/form.sa";
import { useQueryClient } from "@tanstack/react-query";

interface CellActionProps {
  data: Project;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useNavigate();
  const queryClient = useQueryClient();
  const onConfirm = async () => {
    console.log("Deleting form " + data._id);
    const formId: string = data._id?.toString() ?? "";
    await deleteForm(formId);
    queryClient.refetchQueries({ queryKey: ["forms"] });
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router(`/dashboard/project/builder/${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router(`/dashboard/project/stats/table/${data._id}`)}
          >
            <PieChart className="mr-2 h-4 w-4" /> Data
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router(`/dashboard/project/stats/map/${data._id}`)}
          >
            <MapPinned className="mr-2 h-4 w-4" /> Map
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              window.open(
                "http://localhost:5173/" + data?._id,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <Earth className="mr-2 h-4 w-4" /> Open
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: "Fill this form",
                    text: "I want you to fill this form",
                    url: "http://localhost:5173/" + data?._id,
                  });
                  console.log("Link shared successfully!");
                } catch (error) {
                  console.error("Error sharing the link:", error);
                }
              } 
            }}
          >
            <Share className="mr-2 h-4 w-4" /> Share
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              try {
                await navigator.clipboard.writeText("https://example.com");
                console.log("Link copied to clipboard!");
              } catch (error) {
                console.error("Failed to copy the link:", error);
              }
            }}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
