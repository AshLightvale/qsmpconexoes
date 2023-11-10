import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "QSMP Conexões",
	google: "bmSeCVPnjteb9gBgnfvyRBzSd53yPJt7p5SosTAm6_k",
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
