import logoDJKA from "@/assets/logo/logo-portal.png";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function LayoutSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="py-6 hover:bg-transparent rounded-none relative bg-primaryDjka">
          <div>
            <img
              src={logoDJKA}
              alt="DJKA Portal Logo"
              className="w-full rounded-lg"
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
