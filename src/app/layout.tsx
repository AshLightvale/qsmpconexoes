import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "QSMP Connections",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex justify-center">{children}</body>
		</html>
	);
}
