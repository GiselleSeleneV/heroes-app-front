import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router";

interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList className="text-slate-300">
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="text-slate-300 hover:!text-white transition-colors"
          >
            <Link to="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb) => (
          <div className="flex items-center" key={crumb.to}>
            <BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-500">
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbLink
                asChild
                className="text-slate-300 hover:!text-white transition-colors"
              >
                <Link to={crumb.to}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator className="text-slate-500">
          <SlashIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage className="text-white font-medium">
            {currentPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
