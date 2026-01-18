import type { Permission } from "@/components/PermissionBadge";

export interface ParameterGroup {
  name: string;
  usage?: string;
  aliases?: string[];
  description: string;
}

export interface Command {
  id: string;
  name: string;
  usage?: string;
  aliases?: string[];
  permission: Permission;
  commandGroups?: string[];
  description: string;
  usageVariations?: string[];
  parameterGroups?: ParameterGroup[];
  massCompatible?: boolean;
}
