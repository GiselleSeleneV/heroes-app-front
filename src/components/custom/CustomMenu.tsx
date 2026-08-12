import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuList } from "../ui/NavigationMenu";
import { cn } from "@/lib/utils";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu className="pb-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              "p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors",
              isActive("/") && "bg-white/15 text-white",
            )}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              "p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors",
              isActive("/search") && "bg-white/15 text-white",
            )}
          >
            <Link to="/search">Buscar superhéroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
