import Link from "next/link";

interface NavBarLinkProps {
  label: string;
  href: string;
  subMenu?: {
    label: string;
    href: string;
  }[];
}

export function NavBarLink({ href, label, subMenu }: NavBarLinkProps) {
  return (
    <span className="relative group flex justify-center items-center py-2 w-24 hover:bg-panel duration-100">
      <Link href={href}>{label}</Link>
      {subMenu && (
        <div className="absolute hidden group-hover:flex flex-col left-0 right-0 top-10 bg-panel">
          {subMenu.map((item, index) => (
            <Link
              key={`${item.label}${index}`}
              href={item.href}
              className="p-2 text-secondary hover:underline hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </span>
  );
}
