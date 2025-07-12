import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ChevronDown,
  CircleUserRound,
  LogOutIcon,
  PenIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LayoutHeader = () => {
  const username = "john.doe";
  const employee = {
    name: "Mochamad Rizky ",
    nip: "123456789",
    photo: "https://ui-avatars.com/api/?name=Mochamad%20Rizky",
    sik_user_id: null,
  };

  const [dateTime, setDateTime] = useState<string>("");

  const onLogoutHandler = () => {
    console.log("Logout clicked");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(
        format(new Date(), "EEEE, dd MMMM yyyy HH:mm:ss", { locale: id })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={cn("flex gap-3")}>
        <div className="flex px-4 items-center gap-4">
          <div className="hidden lg:block text-xs text-white">
            <span>{dateTime}</span>
          </div>
        </div>

        <div className="block h-[50px] lg:h-full w-[2px] bg-white mx-3 lg:mx-2" />

        {/* profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 text-black lg:text-white hover:text-white focus:outline-none focus:ring-0 data-[state=open]:text-white">
            {employee?.photo ? (
              <div className="rounded-full h-[35px] w-[35px] overflow-hidden ring-2 ring-white/20">
                <img
                  height={30}
                  width={30}
                  className="h-full w-full object-cover"
                  src={employee?.photo}
                  alt="profile"
                />
              </div>
            ) : (
              <div className="rounded-full h-[35px] w-[35px] bg-gray-200 lg:bg-white/20 flex items-center justify-center">
                <CircleUserRound className="w-[35px] h-[35px] text-gray-600 lg:text-white" />
              </div>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <div className="font-semibold capitalize max-w-[150px] truncate">
                <span className="text-xs">{employee?.name || username}</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px] p-0"
            align="end"
            sideOffset={5}
          >
            <DropdownMenuLabel className="bg-thirdDjka py-3 px-4 border-b">
              <div className="text-primaryDjka">
                <h3 className="font-bold text-sm leading-tight">
                  {employee?.name || username}
                </h3>
                {employee?.nip && (
                  <p className="text-xs text-gray-600 mt-1">
                    NIP: {employee?.nip}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>

            <div className="p-2">
              <DropdownMenuItem asChild className="text-xs cursor-pointer">
                <Link
                  to="/dashboard/profile"
                  className="cursor-pointer text-primaryDjka"
                >
                  <CircleUserRound className="w-5 h-5" />
                  <span>Profile Saya</span>
                </Link>
              </DropdownMenuItem>

              {!employee?.sik_user_id && (
                <>
                  <DropdownMenuItem
                    className="cursor-pointer text-primaryDjka"
                    onClick={() => {}}
                  >
                    <PenIcon className="w-5 h-5" />
                    <span>Ubah Kata Sandi</span>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator className="my-2" />

              <DropdownMenuItem
                className="py-1 text-xs px-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onLogoutHandler}
              >
                <LogOutIcon className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default LayoutHeader;
