import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center py-24">
			<div className="flex-1 flex flex-col justify-center">
				<header className="text-center">
					<h1 className="mb-2 text-3xl font-bold">
						QSMP Connections
					</h1>
					<div className="grid grid-cols-2 gap-4 gap-y-1">
						<h2 className="text-primary text-right">Bem-vindo</h2>
						<h2 className="text-primary text-left">Bienvenido</h2>
						<h2 className="text-primary text-right">Welcome</h2>
						<h2 className="text-primary text-left">Bienvenu</h2>
					</div>
				</header>
				<main className="mt-8">
					<div className="grid grid-cols-2 gap-4">
						<Button
							variant="ghost"
							asChild
							className="flex h-fit gap-3 justify-start flex-row-reverse items-center p-4"
						>
							<Link href="/pt">
								<Image
									src="/br.svg"
									alt="Bandeira do Brasil"
									width={96}
									height={72}
									className="aspect-[4/3] w-8 rounded-md sm:w-10"
								/>
								<span>Português</span>
							</Link>
						</Button>
						<Button
							variant="ghost"
							asChild
							className="flex h-fit gap-3 justify-start items-center p-4"
						>
							<Link
								href="/es"
								className="bg-transparent text-center"
							>
								<div className="relative">
									<Image
										src="/mx.svg"
										alt="Bandeira do Mexico"
										width={96}
										height={72}
										className="aspect-[4/3] w-8 rounded-md sm:w-10"
									/>
									<Image
										src="/es.svg"
										alt="Bandeira da Espanha"
										width={96}
										height={72}
										className="diag-top absolute inset-0 aspect-[4/3] w-8 rounded-md sm:w-10"
									/>
								</div>
								<span>Español</span>
							</Link>
						</Button>
						<Button
							variant="ghost"
							asChild
							className="flex h-fit gap-3 justify-start flex-row-reverse items-center p-4"
						>
							<Link
								href="/en"
								className="bg-transparent text-center"
							>
								<Image
									src="/us.svg"
									alt="Bandeira dos Estados Unidos"
									width={96}
									height={72}
									className="aspect-[4/3] w-8 rounded-md sm:w-10"
								/>
								<span>English</span>
							</Link>
						</Button>
						<Button
							variant="ghost"
							asChild
							className="flex h-fit gap-3 justify-start items-center p-4"
						>
							<Link
								href="/fr"
								className="bg-transparent text-center"
							>
								<Image
									src="/fr.svg"
									alt="Bandeira da França"
									width={96}
									height={72}
									className="aspect-[4/3] w-8 rounded-md sm:w-10"
								/>
								<span>Français</span>
							</Link>
						</Button>
					</div>
				</main>
			</div>
			<footer className="w-full justify-center p-8">
				<p className="text-cold-purple-200 text-center text-sm [text-wrap:balance]">
					Feito com 💜 por{" "}
					<Link
						href="https://twitter.com/feeeyli"
						className="text-[#FFA4CF] underline"
						target="_blank"
					>
						Feyli
					</Link>
					, para toda comunidade do QSMP!
				</p>
			</footer>
		</div>
	);
}
