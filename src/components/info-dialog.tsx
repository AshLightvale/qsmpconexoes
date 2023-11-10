import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Github, Heart, HelpCircle } from "lucide-react";
import Link from "next/link";

export const InfoDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<HelpCircle size="1.5rem" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sobre</DialogTitle>
				</DialogHeader>
				<main className="[&_strong]:font-normal [&_strong]:text-primary">
					<p className="inline-block mb-2 indent-2">
						Você deve formar grupos de <strong><b>4 palavras</b></strong>{" "}
						que tenham ligação entre elas clicando nas palavras.
					</p>
					<p className="indent-2">
						Ao formar o grupo o resultado será revelado, se você
						acertou ou não. Caso tenha <strong>acertado</strong>, a
						categoria será revelada, <strong>senão</strong>, apenas
						tente novamente.
					</p>
				</main>
				<footer>
					<p className="text-sm inline-block mb-1">
						Inspirado por{" "}
						<Link
							href="https://conexo.ws/"
							target="_blank"
							className="text-primary hover:underline active:underline"
						>
							CONEXO
						</Link>{" "}
						e{" "}
						<Link
							href="https://conexaoop.vercel.app/"
							target="_blank"
							className="text-primary hover:underline active:underline"
						>
							CONEXÃO PARANORMAL
						</Link>
					</p>
					<p className="text-sm [text-wrap:balance]">
						<span>Programação e Site originalmente feito por{" "}
						<Link
							href="https://twitter.com/feeeyli"
							className="text-[#FFA4CF] underline"
							target="_blank"
						>
							Feyli
						</Link></span>
						<span>Sendo atualizado por{" "}
						<Link
							href="https://twitter.com/AshLightvale"
							className="text-[#FFA4CF] underline"
							target="_blank"
						>
							AshLightvale
						</Link></span>

						<span>Feito com{" "}
						<Heart
							size="1rem"
							className="inline mx-1 fill-[#FFA4CF] text-[#FFA4CF]"
						/>{" "}
						, para toda comunidade do QSMP!</span>
					</p>
				</footer>
			</DialogContent>
		</Dialog>
	);
};
