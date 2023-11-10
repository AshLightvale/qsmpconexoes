import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "QSMP Conexões",
	verification: {
		google: "google814bb35cc5bc0b6e.html"
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex justify-center min-h-screen">{children}</body>
		</html>
	);
}
