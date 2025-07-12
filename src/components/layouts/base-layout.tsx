/* eslint-disable @typescript-eslint/no-explicit-any */
import LayoutHeader from "@/components/layouts/header-layout";
import { LayoutSidebarHeader } from "@/components/layouts/layout-sidebar-header";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Activity,
  BookIcon,
  ChartNetworkIcon,
  ChevronRight,
  FileTextIcon,
  Home,
  MailIcon,
  MonitorIcon,
  NotebookIcon,
  SendIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const BaseLayout = () => {
  const isMobile = useIsMobile();
  const { open: sidebarOpen, setOpen: setOpenSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMainItem, setSelectedMainItem] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const navMain = useMemo(() => {
    const navigation: {
      title: string;
      url: string;
      icon: React.ComponentType<any>;
      isActive?: boolean;
      show: boolean;
      items?: {
        title: string;
        url: string;
        icon: React.ComponentType<any>;
        show: boolean;
        badge?: string;
        hasNotification?: boolean;
        subMenu?: {
          title: string;
          url: string;
          icon: React.ComponentType<any>;
          show: boolean;
        }[];
      }[];
      badge?: string;
      hasNotification?: boolean;
      showBadge?: boolean;
    }[] = [
      {
        title: "Beranda",
        url: "/dashboard",
        icon: Home,
        isActive: true,
        show: true,
      },
      {
        title: "Dashboard",
        url: "#",
        icon: ChartNetworkIcon,
        isActive: true,
        show: true,
        items: [
          {
            title: "Pelaksanaan Anggaran",
            url: "/dashboard/dashboard-pelaksanaan-anggaran",
            icon: TrendingUp,
            show: true,
          },
          {
            title: "Pemantauan Kinerja",
            url: "/dashboard/dashboard-pemantauan-kinerja",
            icon: Activity,
            show: true,
          },
          {
            title: "Sumber Daya Manusia",
            url: "/dashboard/dashboard-sumber-daya-manusia",
            icon: Users,
            show: true,
          },
        ],
      },
      {
        title: "Menu Tata Usaha",
        url: "#",
        icon: BookIcon,
        isActive: true,
        show: true,
        items: [
          {
            title: "Pesuratan Masuk",
            url: "/inbox",
            icon: MailIcon,
            show: true,
          },
          {
            title: "Persuratan Keluar",
            url: "#",
            icon: SendIcon,
            show: true,
            subMenu: [
              {
                title: "Surat Dinas",
                url: "/dashboard/outbox/surat-dinas",
                icon: FileTextIcon,
                show: true,
              },
              {
                title: "Nota Dinas",
                url: "/dashboard/outbox/nota-dinas",
                icon: NotebookIcon,
                show: true,
              },
            ],
          },
          {
            title: "Naskah Dinas Lainnya",
            url: "/dashboard/dokumen-arsip",
            icon: FileTextIcon,
            show: true,
          },
          {
            title: "Monitoring Persuratan Prioritas",
            url: "/inbox",
            icon: MonitorIcon,
            show: true,
          },
        ],
      },
    ];

    return navigation.filter((item) => item.show);
  }, []);

  const handleMainItemClick = (itemTitle: string) => {
    if (isMobile) {
      setIsSheetOpen(true);
      setSelectedMainItem(itemTitle);
    } else {
      setSelectedMainItem(selectedMainItem === itemTitle ? null : itemTitle);
      setSelectedSubItem(null);
    }
  };

  const handleSubItemClick = (subItemTitle: string, hasSubMenu = false) => {
    if (hasSubMenu) {
      setSelectedSubItem(
        selectedSubItem === subItemTitle ? null : subItemTitle
      );
    }
  };

  const isActivePath = (url: string) => {
    const currentPath = location.pathname;
    if (url === "#") {
      return false;
    }
    return url.startsWith(currentPath) && currentPath === url;
  };

  const renderMobileSheet = () => (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>
            {selectedMainItem &&
              navMain.find((item) => item.title === selectedMainItem)?.title}
          </SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 text-xs auto-rows-min gap-4 p-4">
          <SidebarMenu>
            {selectedMainItem &&
              navMain
                .find((item) => item.title === selectedMainItem)
                ?.items?.filter((item) => item.show !== false)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.subMenu ? (
                      <>
                        <SidebarMenuButton
                          onClick={() =>
                            handleSubItemClick(item.title, !!item.subMenu)
                          }
                          className={cn(
                            "justify-between",
                            selectedSubItem === item.title && "bg-accent"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                {item.badge}
                              </span>
                            )}
                            {item.hasNotification && (
                              <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </SidebarMenuButton>
                        {selectedSubItem === item.title && (
                          <SidebarMenuSub>
                            {item.subMenu
                              .filter((subItem) => subItem.show !== false)
                              .map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    onClick={() => {
                                      navigate(subItem.url);
                                      setIsSheetOpen(false);
                                    }}
                                    className={cn(
                                      isActivePath(subItem.url) &&
                                        "bg-accent text-accent-foreground"
                                    )}
                                  >
                                    <subItem.icon className="h-3 w-3" />
                                    <span className="text-xs">
                                      {subItem.title}
                                    </span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        onClick={() => {
                          navigate(item.url);
                          setIsSheetOpen(false);
                        }}
                        className={cn(
                          isActivePath(item.url) &&
                            "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-auto">
                            {item.badge}
                          </span>
                        )}
                        {item.hasNotification && (
                          <span className="w-2 h-2 rounded-full bg-red-500 ml-auto"></span>
                        )}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
          </SidebarMenu>
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopNestedContent = () => {
    const selectedMain = navMain.find(
      (item) => item.title === selectedMainItem
    );
    if (!selectedMain || !selectedMain.items) return null;

    const leftPosition = sidebarOpen ? "8rem" : "3rem";

    return (
      <div
        className={cn(
          "fixed w-64 bg-sidebar border-r shadow-lg h-[calc(100vh-4rem)] z-30 overflow-y-auto",
          sidebarOpen ? "top-16" : "top-12"
        )}
        style={{ left: leftPosition }}
      >
        <div className="p-3 border-b">
          <h3 className="font-semibold text-sm text-sidebar-foreground">
            {selectedMain.title}
          </h3>
        </div>
        <div className="p-2">
          <SidebarMenu>
            {selectedMain.items
              .filter((item) => item.show !== false)
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subMenu ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => {
                          handleSubItemClick(item.title, !!item.subMenu);
                        }}
                        className={cn(
                          "justify-between text-xs",
                          selectedSubItem === item.title && "bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-3 w-3" />
                          <span className="text-xs">{item.title}</span>
                          {item.badge && (
                            <span className="bg-red-500 text-white rounded-full px-1 py-0.5 text-xs">
                              {item.badge}
                            </span>
                          )}
                          {item.hasNotification && (
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          )}
                        </div>
                        <ChevronRight className="h-3 w-3" />
                      </SidebarMenuButton>
                      {selectedSubItem === item.title && (
                        <SidebarMenuSub>
                          {item.subMenu
                            .filter((subItem) => subItem.show !== false)
                            .map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  onClick={() => {
                                    navigate(subItem.url);
                                  }}
                                  size="sm"
                                  className={cn(
                                    isActivePath(subItem.url) &&
                                      "bg-accent text-accent-foreground"
                                  )}
                                >
                                  <subItem.icon className="h-3 w-3" />
                                  <span className="text-xs">
                                    {subItem.title}
                                  </span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      onClick={() => {
                        navigate(item.url);
                        setOpenSidebar(false);
                      }}
                      size="sm"
                      className={cn(
                        "text-xs",
                        isActivePath(item.url) &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-3 w-3" />
                      <span className="text-xs">{item.title}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white rounded-full px-1 py-0.5 text-xs ml-auto">
                          {item.badge}
                        </span>
                      )}
                      {item.hasNotification && (
                        <span className="w-2 h-2 rounded-full bg-red-500 ml-auto"></span>
                      )}
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </div>
      </div>
    );
  };

  return (
    <>
      <Sidebar className="z-[50]" side="left" collapsible="icon">
        <SidebarHeader className="bg-primaryDjka relative">
          <LayoutSidebarHeader />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navMain.map((section) => (
                <SidebarMenuItem className="flex" key={section.title}>
                  {section.url && section.url !== "#" ? (
                    <SidebarMenuButton
                      onClick={() => {
                        navigate(section.url);
                        if (isMobile) {
                          setIsSheetOpen(false);
                        } else {
                          setSelectedMainItem(null);
                          setSelectedSubItem(null);
                        }
                      }}
                      className={cn(
                        "h-auto flex flex-col justify-center items-center w-full text-center text-[12px] relative",
                        isActivePath(section.url) &&
                          selectedMainItem === null &&
                          "bg-primaryDjka text-white hover:bg-primaryDjka/80 hover:text-white"
                      )}
                    >
                      <section.icon className="h-11 w-11" />
                      {sidebarOpen && <span>{section.title}</span>}
                      {section.showBadge && sidebarOpen && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0.5 text-xs min-w-5 h-5 flex items-center justify-center">
                          {section.badge}
                        </div>
                      )}
                      {section.hasNotification && sidebarOpen && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></div>
                      )}
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      className={cn(
                        "h-auto flex flex-col justify-center w-full text-center text-[12px] relative",
                        (selectedMainItem === section.title ||
                          (section.items?.some((item) =>
                            isActivePath(item.url)
                          ) &&
                            selectedMainItem === null) ||
                          (section.items?.some((item) =>
                            item.subMenu?.some((subItem) =>
                              isActivePath(subItem.url)
                            )
                          ) &&
                            selectedMainItem === null)) &&
                          "bg-primaryDjka text-white hover:bg-primaryDjka/80 hover:text-white"
                      )}
                      onClick={() => handleMainItemClick(section.title)}
                    >
                      <section.icon className="h-11 w-11" />
                      {sidebarOpen && <span>{section.title}</span>}
                      {section.showBadge && sidebarOpen && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0.5 text-xs min-w-5 h-5 flex items-center justify-center">
                          {section.badge}
                        </div>
                      )}
                      {section.hasNotification && sidebarOpen && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></div>
                      )}
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header
          className={cn(
            "flex fixed top-0 left-0 h-16 shrink-0 bg-primaryDjka z-10 w-full items-center gap-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
            sidebarOpen && "pl-[8rem]",
            !sidebarOpen && "pl-[3rem]",
            isMobile && "pl-0 w-full"
          )}
        >
          <div className="flex-grow">
            <div className="flex w-full items-center justify-between gap-2 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-white hover:bg-transparent hover:text-white/80" />
                <Separator orientation="vertical" className="mr-2" />
              </div>
              <div className="flex gap-2">
                <LayoutHeader />
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 pt-16 bg-[#f5f0ed] relative">
          {!isMobile && renderDesktopNestedContent()}
          {isMobile && renderMobileSheet()}

          <div
            className={cn(
              "transition-all min-h-[calc(100vh-64px)] duration-200"
            )}
          >
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default BaseLayout;
