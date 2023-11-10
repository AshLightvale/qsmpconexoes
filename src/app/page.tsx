"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage, useCopyToClipboard } from "usehooks-ts";
import { shuffle } from "@/utils/shuffle";
import { ALL_CONNECTIONS } from "@/data/connections";
import { InfoDialog } from "@/components/info-dialog";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type Connection = {
	name?: string;
	color?: string;
	items: string[];
};

const day = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
	26, 27, 28, 29, 30, 31,
];

const COLORS = ["#009d28", "#ff9a00", "#ff0133", "#001884"]; // ["#009d28", "#ff9a00", "#ff0133", "#001884"]
export default function Game() {
	const [selected, setSelected] = useState<string[]>([]);

	const [_, copyResult] = useCopyToClipboard();
	const [copiedAlert, setCopiedAlert] = useState(false);

	const now = new Date();
	const date = now.getDate()
	const month = now.getMonth() + 1
	const year = now.getFullYear()
	const today = date.toString() + month.toString() + year.toString()

	const CONNECTIONS = ALL_CONNECTIONS[today] || [];

	const [memory, setMemory] = useLocalStorage<{
		[name: string]: Connection[];
	}>("memory", {});

	const [attempts, setAttempts] = useState<Connection[]>(memory[today] || []);

	const [status, setStatus] = useState<
		"waiting" | "wrong" | "correct" | "over"
	>(
		(memory[today] || []).filter((att) => att.name).length === 4
			? "over"
			: "waiting"
	);

	const connections = CONNECTIONS.map((conn, i) => ({
		color: COLORS[i],
		...conn,
	})).filter((conn) => !attempts.map((att) => att.name).includes(conn.name));

	const corrects = attempts.filter((attempt) => attempt.name);

	const shuffledConnections = useMemo(() => {
		return shuffle(
			connections.map((connection) => connection.items).flat()
		);
	}, []);

	const result = (memory[today] || []).map((attempt) =>
		attempt.color
			? ["🟩", "🟨", "🟥", "🟦"][COLORS.indexOf(attempt.color)]
			: "❌"
	);

	const tries = (memory[today] || []).length;

	function selectFourHandler(selected: string[]) {
		const correctConnection = connections.find((connection) =>
			selected.every((s) => connection.items.includes(s))
		);

		if (correctConnection) {
			setStatus("correct");
			setTimeout(() => {
				setAttempts((old) => [...old, correctConnection]);
			}, 1000);
		} else {
			setStatus("wrong");
			setAttempts((old) => [
				...old,
				{ name: undefined, items: selected },
			]);
		}

		setTimeout(() => {
			setStatus(
				corrects.length === 3 && correctConnection ? "over" : "waiting"
			);
			setSelected([]);
		}, 1000);
	}

	useEffect(() => {
		setMemory((old) => ({ ...old, [today]: attempts }));
	}, [attempts, setMemory, today]);

	return (
		<div className="max-w-[512px] w-[90%] my-12 flex flex-col items-center">
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
				<h1 className="text-xl font-bold">QSMP Conexões</h1>
				<InfoDialog />
			</header>
			{/* <pre>{JSON.stringify(memory[today], null, 2)}</pre> */}
			{memory[today] && (
				<main className="pt-8">
					{status === "over" && (
						<motion.div
							animate={{ height: "auto" }}
							className="h-0 mb-4"
							transition={{ type: "spring" }}
						>
							<div className="mb-3 bg-muted rounded-md px-6 py-4 text-center">
								<div className="text-center">
									<span className="block text-lg font-bold">
										Parabéns!
									</span>
									<span>
										Você conseguiu em <b>{tries}</b> tentativas.
									</span>
								</div>
								<span className="mt-4 block break-words">
									{result}
								</span>
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
												`Joguei QSMP Conexões e consegui em ${tries} tentativas: \n\n${result.join(
													""
												)}\n\nPara jogar também acesse: conexo-qsmp.vercel.app`
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
							</div>
							<div className="mb-3 bg-muted rounded-md px-6 py-4 text-center flex flex-col items-center gap-2">
								<p className="text-balance">
									Gostou do QSMP Conexões?
									Dê sugestões:
								</p>
								<Button
									variant="outline"
									className="h-auto flex gap-2 bg-transparent border-primary/10 hover:bg-primary/10"
									asChild
								>
									<Link
										href="https://forms.gle/Dvwm4osQZ25P8jMd9"
										target="_blank"
									>
										<Image
											src="/Google_Forum.svg"
											alt="Logo do Google Forum"
											width={24}
											height={24}
										/>
										<div className="text-left">
											<span className="block">
												Forum de Sugestões:
											</span>
											<span className="text-sm text-muted-foreground">
												forms.gle/Dvwm4osQZ25P8jMd9
											</span>
										</div>
									</Link>
								</Button>
							</div>
							<div className="bg-muted rounded-md px-6 py-4 text-center flex flex-col items-center gap-2">
								<p className="text-balance">
									Gosta de assistir varios POV do QSMP?
									Experimente o MultiQSMP:
								</p>
								<Button
									variant="outline"
									className="h-auto flex gap-2 bg-transparent border-primary/10 hover:bg-primary/10"
									asChild
								>
									<Link
										href="https://multiqsmp.vercel.app"
										target="_blank"
									>
										<Image
											src="/multiqsmp-logo.svg"
											alt="Logo do MultiQSMP"
											width={32}
											height={32}
										/>
										<div className="text-left">
											<span className="block">
												MultiQSMP
											</span>
											<span className="text-sm text-muted-foreground">
												multiqsmp.vercel.app
											</span>
										</div>
									</Link>
								</Button>
							</div>
						</motion.div>
					)}
					<div className="flex justify-between">
						<span className="text-bold">
							{new Date().toLocaleString("pt-BR", {
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
									className="h-[50.38px] opacity-0 sm:h-[78.42px] text-xs sm:text-base flex flex-col items-center justify-center bg-[var(--color)] rounded-md"
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
							{shuffledConnections.map((item) => (
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
											hover:max-sm:data-[state=on]:data-[correct=false]:data-[wrong=false]:bg-[#8765c3]
											hover:max-sm:bg-muted/30
											sm:text-base
											hover:text-foreground
											aspect-[112/72]
											data-[correct=true]:!bg-[var(--color)]
											text-balance
											no-select
										"
									>
										{item}
									</ToggleGroup.Item>
								</Button>
							))}
						</ToggleGroup.Root>
					</div>
				</main>
			)}
			{!memory[today] && (
				<main className="flex items-center justify-center py-12">
					<Loader2 size="1.5rem" className="animate-spin" />
				</main>
			)}
			<p className="block mt-auto text-sm text-muted-foreground">
				Informações tiradas da wiki.
			</p>
		</div>
	);
}
