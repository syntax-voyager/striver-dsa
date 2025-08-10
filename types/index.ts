export interface FileEntry {
  path: string;
  name: string;
  content: string;
}
export interface TreeNode {
  name: string;
  type: "folder" | "file";
  path?: string;
  children?: Record<string, TreeNode>;
}
export interface IndexData {
  generatedAt: string;
  files: FileEntry[];
  tree: TreeNode;
}
