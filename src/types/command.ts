import { Permission } from "@/components/PermissionBadge";

export interface ParameterGroup {
  name: string;
  aliases: string[];
  description: string;
}

export interface Command {
  id: string;
  name: string;
  aliases: string[];
  permission: Permission;
  description: string;
  usage: string;
  usageVariations?: string[];
  parameterGroups?: ParameterGroup[];
  massCompatible?: boolean;
}
