import Link from "next/link";
import { Github, GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full shrink-0 border-t mt-16 bg-card/50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex md:hidden flex-col gap-2 mb-5">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-semibold">BeyondSyllabus</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your AI-powered guide to the university curriculum.
          </p>
          <a
            href="https://github.com/The-Purple-Movement/WikiSyllabus"
            target="_blank"
            className="w-[100px] rounded-[10px] flex p-3 bg-black/20 hover:shadow-lg"
          >
            {" "}
            <Github /> GitHub
          </a>
        </div>
        <div className=" flex">
          <div className="md:flex md:visible hidden flex-col gap-2 mb-5">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="font-semibold">BeyondSyllabus</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered guide to the university curriculum.
            </p>
            <a
              href="https://github.com/The-Purple-Movement/WikiSyllabus"
              target="_blank"
              className="w-[100px] rounded-[10px] flex p-3 bg-black/20 hover:shadow-lg"
            >
              {" "}
              <Github /> GitHub
            </a>
          </div>

          <div className="flex gap-5  flex-row w-[100%] md:justify-evenly ">
            <div>
              <h3 className="text-sm font-semibold mb-3 ">Navigation</h3>
              <nav className="flex flex-col gap-2">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/select">Select Course</FooterLink>
                <FooterLink href="/chat-with-file">AI Chat</FooterLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Resources</h3>
              <nav className="flex flex-col gap-2">
                <FooterLink href="#">Contribution Guide</FooterLink>
                <FooterLink href="#">Code of Conduct</FooterLink>
                <FooterLink href="#">License</FooterLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Legal</h3>
              <nav className="flex flex-col gap-2">
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>
            {new Date().getFullYear()} BeyondSyllabus. All rights reserved. An
            open-source project.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
      prefetch={false}
    >
      {children}
    </Link>
  );
}
