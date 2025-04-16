import { socketService } from "@/services/socketService.js";

export default function () {
  return {
    listenForWorkspaceUpdate: (onUpdate) => {
      socketService.onWorkspaceUpdate((data) => {
        console.log("Workspace updated:", data);

        onUpdate(data);
      });
    },
  };
}
