"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCopyToClipboard } from "@/utils/useCopytoClipboard";

type Connection = {
	name: string;
	color: string;
	items: string[];
};

export default function Game() {
	const [tries, setTries] = useState(0);
	const [corrects, setCorrects] = useState<Connection[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [status, setStatus] = useState<
		"waiting" | "wrong" | "correct" | "over"
	>("waiting");
	const CONNECTIONS = [
		{
			name: "Números",
			items: ["1", "6", "8", "9"],
		},
		{
			name: "Letras",
			items: ["F", "N", "Y", "A"],
		},
		{
			name: "Símbolos",
			items: ["#", "%", "&", "@"],
		},
		{
			name: "Pontuação",
			items: ["!", ".", "?", ","],
		},
	];
	const COLORS = ["#009d28", "#ff9a00", "#ff0133", "#001884"];
	const [connections, setConnections] = useState<Connection[]>(
		CONNECTIONS.map((conn, i) => ({ color: COLORS[i], ...conn }))
	);
	const [result, setResult] = useState("");
	const [_, copyResult] = useCopyToClipboard();
	const [copiedAlert, setCopiedAlert] = useState(false);

	function selectFourHandler(selected: string[]) {
		const correctConnection = connections.find((connection) =>
			selected.every((s) => connection.items.includes(s))
		);

		if (correctConnection) {
			setStatus("correct");
			setTimeout(() => {
				setCorrects((old) => [...old, correctConnection]);
				setConnections((old) =>
					old.filter((conn) => conn !== correctConnection)
				);
			}, 1000);
			setResult(
				(old) =>
					old +
					["🟩", "🟨", "🟥", "🟦"][
						COLORS.findIndex((c) => c === correctConnection.color)
					]
			);
		} else {
			setStatus("wrong");
			setResult((old) => old + "❌");
		}

		setTries((old) => old + 1);

		setTimeout(() => {
			setStatus(
				corrects.length === 3 && correctConnection ? "over" : "waiting"
			);
			setSelected([]);
		}, 1000);
	}

	return (
		<div className="max-w-[512px] w-[90%] my-12">
			<header className="flex justify-between items-center w-full">
				<Button
					variant="ghost"
					size="icon"
					asChild
					className="opacity-0 pointer-events-none"
				>
					<Link href="/">
						<ArrowLeft size="1.25rem" />
					</Link>
				</Button>
				<h1 className="text-xl font-bold">Conexões QSMP</h1>
				<Button variant="ghost" size="icon">
					<HelpCircle size="1.25rem" />
				</Button>
			</header>
			<main className="pt-8">
				{status === "over" && (
					<motion.div
						animate={{ height: "auto" }}
						className="mb-4 h-0 bg-muted rounded-md px-6 py-4 text-center"
					>
						<div className="text-center">
							<span className="block text-lg font-bold">
								Parabéns!
							</span>
							<span>Você conseguiu em {tries} tentativas.</span>
						</div>
						<span className="mt-4 block">{result}</span>
						<div className="mt-4">
							{copiedAlert && (
								<motion.span
									className="block scale-0 opacity-0"
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0, opacity: 0 }}
								>
									Copiado!
								</motion.span>
							)}
							<Button
								className="mt-2"
								onClick={() => {
									copyResult(
										`Joguei QSMP Conexões e consegui em ${tries} tentativas:
										${result}
										Para jogar acesse: qsmpconexoes.vercel.app`
									);

									setCopiedAlert(true);

									setTimeout(() => {
										setCopiedAlert(false);
									}, 5000);
								}}
							>
								Compartilhar
							</Button>
						</div>
					</motion.div>
				)}
				<div className="flex justify-between">
					<span className="text-bold">
						{new Date().toLocaleString(undefined, {
							day: "numeric",
							month: "numeric",
							year: "numeric",
						})}
					</span>
					<span>
						Tentativas:{" "}
						<strong className="text-bold">{tries}</strong>
					</span>
				</div>
				<div className="mt-4">
					<div className="space-y-2">
						{corrects.map((connection) => (
							<motion.div
								key={connection.name}
								style={
									{
										"--color": connection.color,
									} as React.CSSProperties
								}
								className="h-[50.38px] opacity-0 sm:h-[78.42px] flex flex-col items-center justify-center bg-[var(--color)] rounded-md"
								animate={{ opacity: 1 }}
							>
								<span className="font-bold">
									{connection.name}
								</span>
								<p>{connection.items.join(", ")}</p>
							</motion.div>
						))}
					</div>
					<ToggleGroup.Root
						type="multiple"
						className="grid grid-cols-4 gap-2 mt-2"
						value={selected}
						onValueChange={(newSelected) => {
							if (status !== "waiting") return;

							setSelected(newSelected);

							if (newSelected.length === 4)
								selectFourHandler(newSelected);
						}}
					>
						{connections
							.map((connection) => connection.items)
							.flat()
							.map((item) => (
								<Button key={item} asChild variant="ghost">
									<ToggleGroup.Item
										value={item}
										data-wrong={
											status === "wrong" &&
											selected.includes(item)
										}
										data-correct={
											(status === "correct" &&
												selected.includes(item)) ||
											!!corrects.find((correct) =>
												correct.items.includes(item)
											)
										}
										style={
											{
												"--color": connections.find(
													(conn) =>
														conn.items.includes(
															item
														)
												)?.color,
											} as React.CSSProperties
										}
										className="
											data-[wrong=true]:animate-shake
											data-[wrong=true]:bg-muted/30
											data-[wrong=true]:border-2
											data-[correct=true]:animate-tada
											data-[state=on]:bg-[#8765c3]
											h-auto
											bg-muted/30
											text-xs
											sm:text-base
											hover:text-foreground
											aspect-[112/72]
											data-[correct=true]:bg-[var(--color)]
										"
									>
										{item}
									</ToggleGroup.Item>
								</Button>
							))}
					</ToggleGroup.Root>
				</div>
			</main>
		</div>
	);
}
