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

// Translations Zone

type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
  es: { [key: string]: string };
  fr: { [key: string]: string };
	
  [key: string]: { [key: string]: string };
};

const translations: Translations = {
  en: {
    	Header: 'QSMP Connections',
	  
    	Tries: 'TRIES',
	Informations: 'Informations taken from the Wiki.',
	Copied: 'Copied!',
	Share: 'Share',
	ShareMessage: 'I played QSMP Connections and I did it with {tips} hints and in {tries} attempts:\n\n{result}\n\nTo play, visit: qsmp-conexoes.vercel.app',
	  
	Suggestions: 'Did you like QSMP Connections?\nProvide suggestions:',
	SuggestionsForum: 'Suggestions Forum:',
	MultiQSMP: 'Do you enjoy watching various QSMP POVs?\nTry out MultiQSMP:',
	UseTip: 'Use a hint',
	  
	Congratulations1: 'Congratulations',
	Congratulations2: 'You completed it with {tips} hints and in {tries} attempts.',
  },
  pt: {
    	Header: 'QSMP Conexões',

    	Tries: 'TENTATIVAS',
	Informations: 'Informações tiradas da wiki.',
	Copied: 'Copiado!',
	Share: 'Compartilhar',
 	ShareMessage: 'Joguei QSMP Conexões e consegui com {tips} dicas e em {tries} tentativas:\n\n{result}\n\nPara jogar também acesse: qsmp-conexoes.vercel.app',
	  
	Suggestions: 'Gostou do QSMP Conexões?\nDê sugestões:',
	SuggestionsForum: 'Forum de Sugestões:',
	MultiQSMP: 'Gosta de assistir vários POVs do QSMP?\nExperimente o MultiQSMP:',
	UseTip: 'Usar uma dica',
	
	Congratulations1: 'Parabéns!',
	Congratulations2: 'Você conseguiu com {tips} dicas e em {tries} tentativas.',
  },
es: {
    Header: 'QSMP Conexiones',
    
    Tries: 'INTENTOS',
    Informations: 'Información tomada de la Wiki.',
    Copied: '¡Copiado!',
    Share: 'Compartir',
    ShareMessage: 'Jugué QSMP onexiones y lo logré con {tips} pistas y en {tries} intentos:\n\n{result}\n\nPara jugar, visita: qsmp-conexoes.vercel.app',
    
    Suggestions: '¿Te gustaron las QSMP Conexiones?\n¡Proporciona sugerencias!',
    SuggestionsForum: 'Foro de Sugerencias:',
    MultiQSMP: '¿Disfrutas viendo varios POVs de QSMP?\nPrueba MultiQSMP:',
    UseTip: 'Usar una pista',
	
    Congratulations1: 'Felicidades',
    Congratulations2: 'Lo lograste con {tips} pistas y en {tries} intentos.',
  },
  fr: {
    Header: 'QSMP Connexions',

    Tries: 'ESSAIS',
    Informations: 'Informations tirées du Wiki.',
    Copied: 'Copié!',
    Share: 'Partager',
    ShareMessage: 'J\'ai joué à QSMP Connexions et je réussi avec {tips} astuces et en {tries} tentatives :\n\n{result}\n\nPour jouer, visitez : qsmp-conexoes.vercel.app',
    
    Suggestions: 'Vous avez aimé QSMP Connexions?\nFournissez des suggestions :',
    SuggestionsForum: 'Forum des suggestions :',
    MultiQSMP: 'Vous aimez regarder différents POVs de QSMP ?\nEssayez MultiQSMP:',
    UseTip: 'Utiliser une astuce',
	  
    Congratulations1: 'Félicitations',
    Congratulations2: 'Vous avez réussi avec {tips} astuces et en {tries} tentatives.',
  },
};

const connectionNameTranslations: { [name: string]: { [key: string]: string } } = {
	  Visitaram_Bobby: {
	    en: "Visited Bobby Fields",
	    pt: "Visitaram o Bobby Fields",
	    es: "Visitó a Bobby Fields",
	    fr: "A visité Bobby Fields",
	  },
	  Atacados_Codigos: {
	    en: "Attacked by Codes",
	    pt: "Atacados por Códigos",
	    es: "Atacados por códigos",
	    fr: "Attaqués par des codes",
	  },
	  Relacionados_Ramon: {
	    en: "Related to Ramon",
	    pt: "Relacionados ao Ramon",
	    es: "Relacionados con Ramon",
	    fr: "Liés à Ramon",
	  },
	  Capuz: {
	    en: "Individuals who wear hoodies",
	    pt: "Indivíduos que usam capuz",
	    es: "Individuos que usan capuchas",
	    fr: "Personnes qui portent des sweat-shirts à capuche",
	  },
//--------------------------

	Ovos_Primos_Richarlyson: {
	  en: "Richarlyson's Cousin Eggs",
	  pt: "Ovos primos do Richarlyson",
	  es: "Huevos primos de Richarlyson",
	  fr: "Œufs cousins de Richarlyson",
	},
	Nenhuma_Impossivel: {
	  en: "Participated in No Escape is Impossible",
	  pt: "Participaram do Nenhuma fuga é impossível",
	  es: "Parte de Ninguna fuga es imposible",
	  fr: "Fait partie de Aucune évasion n'est impossible",
	},
	Guardas_Federacao: {
	  en: "Federation Guards",
	  pt: "Guardas da Federação",
	  es: "Guardias de la Federación",
	  fr: "Gardes de la Fédération",
	},
	Familia_Brown: {
	  en: "Family Brown",
	  pt: "Família Brown",
	  es: "Familia Brown",
	  fr: "Famille Brown",
	},

//--------------------------

	Alcatraz: {
	  en: "Were in Alcatraz",
	  pt: "Estiveram em Alcatraz",
	  es: "Estuvieron en Alcatraz",
	  fr: "Étaient à Alcatraz",
	},
	Risus_Potion: {
	  en: "Possess Risus Potions",
	  pt: "Possuem Risus Potions",
	  es: "Poseen Pociones de Risus",
	  fr: "Possèdent des Potions de Risus",
	},
	Mataram_Trabalhadores: {
	  en: "Killed workers",
	  pt: "Mataram trabalhadores",
	  es: "Mató a trabajadores",
	  fr: "Ont tué des travailleurs",
	},
	Isla_Furro: {
	  en: "Invited to Isla Furro",
	  pt: "Convidados para a Isla Furro",
	  es: "Invitados a Isla Furro",
	  fr: "Invités à l'Isla Furro",
	},

};


type LanguageOption = {
  value: string;
  label: string;
  flag: string;
};

interface LanguageDropdownProps {
  selectedLanguage: string;
  handleLanguageChange: (language: string) => void;
  languageOptions: LanguageOption[];
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ selectedLanguage, handleLanguageChange, languageOptions }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const getFlag = (language: string): string => {
    return languageOptions.find((option) => option.value === language)?.flag || '';
  };

  const getLabel = (language: string): string => {
    return languageOptions.find((option) => option.value === language)?.label || '';
  };

  return (
<div className="lang-menu" style={{ position: 'relative' }}>
  <div
    className="selected-lang"
    onClick={() => setDropdownOpen(!dropdownOpen)}
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <Image
      src={getFlag(selectedLanguage)}
      alt={`Flag for ${selectedLanguage}`}
      width={25}
      height={25}
      style={{ marginRight: '5px' }}
    />
    <span>{getLabel(selectedLanguage)}</span>
  </div>
  {dropdownOpen && (
    <ul
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0px', 
    position: 'absolute',
    top: '100%',
    right: 0,
    zIndex: 1000,
  }}
    >
      {languageOptions.map((option) => (
        <li key={option.value}>
          <a
            href="#"
            className="bg-muted rounded-md"
            onClick={() => handleLanguageChange(option.value)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Image
              src={option.flag}
              alt={`Flag for ${option.label}`}
              width={25}
              height={25}
              style={{ marginRight: '5px' }}
            />
            <span>{option.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )}
</div>



  );
};

//------------------------------------------------------------------

type Connection = {
	name?: string;
	color?: string;
	items: string[];
};

const day = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
	26, 27, 28, 29, 30, 31,
];

const Max_Tips = 12;

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

	const getTranslation = (key: string, language: string = 'en'): string => {
	  	const connectionId = ALL_CONNECTIONS[today].find(connection => connection.name == key);

if (connectionId && connectionId.name) {
  return (connectionNameTranslations[connectionId.name]?.[language]) || key;
}

return (translations[language][key]) || key;
	};
	
	const CONNECTIONS = ALL_CONNECTIONS[today] || [];

	  const languageOptions: LanguageOption[] = [
    		{ value: 'en', label: 'EN', flag: '/us.svg' },
    		{ value: 'pt', label: 'BR', flag: '/br.svg' },
		{ value: 'es', label: 'ES', flag: '/es.svg' },
		{ value: 'fr', label: 'FR', flag: '/fr.svg' },
    		// Add more language options as needed
  	];
	
  	const [memoryTips, setMemoryTips] = useLocalStorage<{
    		[name: string]: number;
  	}>("memoryTips", {});


  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
  };

	
	const tips = memoryTips[today] || 0;
		
	const [memory, setMemory] = useLocalStorage<{
		[name: string]: Connection[];
	}>("memory", {});
	
	const [attempts, setAttempts] = useState<Connection[]>(memory[today] || []);

	const [selectedLanguage, setSelectedLanguage] = useLocalStorage("selectedLanguage", "pt");
	
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
	
  	const [revealedItems, setRevealedItems] = useState<string[]>([]);
  	const [revealedConnection, setRevealedConnection] = useState<Connection | null>(null);
  const [savedRevealedTips, setSavedRevealedTips] = useLocalStorage<{
    [date: string]: { items: string[]; connection: Connection | null };
  }>('revealedTips', {}); // Use a single key for revealedTips

	
	  const useTipHandler = () => {
    		setMemoryTips((prevTips) => ({
      			...prevTips,
      			[today]: (prevTips[today] || 0) + 1,
    		}));

		   const unrevealedConnections = connections.filter(
      (conn) => !revealedConnection || conn.name !== revealedConnection.name
    );

    const randomConnection =
      unrevealedConnections[Math.floor(Math.random() * unrevealedConnections.length)];

  const shuffledItems = shuffle(randomConnection.items);
  const randomItems = shuffledItems.slice(0, 2);

    setRevealedItems(randomItems);
    setRevealedConnection(randomConnection);

    setSavedRevealedTips({
      ...savedRevealedTips,
      [today]: { items: randomItems, connection: randomConnection },
    });
  	};
	
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

  useEffect(() => {
    if (savedRevealedTips[today]) {
      setRevealedItems(savedRevealedTips[today].items);
      setRevealedConnection(savedRevealedTips[today].connection);
    }
  }, [savedRevealedTips, today]);

	const resetMemory = () => {
  setMemory({});
};
	return (
		<div className="max-w-[512px] w-[90%] my-12 flex flex-col items-center">
			<header className="flex items-right w-full">
			        <LanguageDropdown
          				selectedLanguage={selectedLanguage}
         				handleLanguageChange={handleLanguageChange}
          				languageOptions={languageOptions}
        			/>
			</header>
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
				<h1 className="text-xl font-bold">{getTranslation('Header', selectedLanguage)}</h1>
				 <InfoDialog selectedLanguage={selectedLanguage}/>
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
										{getTranslation('Congratulations1', selectedLanguage)}
									</span>
									<span>
										<span
  											dangerouslySetInnerHTML={{
    												__html: getTranslation('Congratulations2', selectedLanguage)
      												.replace('{tips}', `<b>${tips}</b>`)
      												.replace('{tries}', `<b>${tries}</b>`),
  											}}
										/>
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
											{getTranslation('Copied', selectedLanguage)}
										</motion.span>
									)}
									<Button
										className="mt-2"
										onClick={() => {
											copyResult(
												  getTranslation('ShareMessage', selectedLanguage)
    													.replace('{tips}', `${tips}`)
    													.replace('{tries}', `${tries}`)
    													.replace('{result}', result.join(""))
											);

											setCopiedAlert(true);

											setTimeout(() => {
												setCopiedAlert(false);
											}, 5000);
										}}
									>
										{getTranslation('Share', selectedLanguage)}
									</Button>
								</div>
							</div>
							<div className="mb-3 bg-muted rounded-md px-6 py-4 text-center flex flex-col items-center gap-2">
								<p className="text-balance" style={{ whiteSpace: 'pre-line' }}>
									{getTranslation('Suggestions', selectedLanguage)}
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
												{getTranslation('SuggestionsForum', selectedLanguage)}
											</span>
											<span className="text-sm text-muted-foreground">
												forms.gle/Dvwm4osQZ25P8jMd9
											</span>
										</div>
									</Link>
								</Button>
							</div>
							<div className="bg-muted rounded-md px-6 py-4 text-center flex flex-col items-center gap-2">
								<p className="text-balance" style={{ whiteSpace: 'pre-line' }}>
									{getTranslation('MultiQSMP', selectedLanguage)}
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
					<div className="flex justify-between items-center flex">
						<span className="text-bold">
							{new Date().toLocaleString(selectedLanguage, {
								day: "numeric",
								month: "numeric",
								year: "numeric",
							})}
						</span>
						<span>
							{getTranslation('Tries', selectedLanguage)}:{" "}
							<strong className="text-bold">{tries}</strong>
						</span>
					</div>
					{status !== 'over' && (
						<div className="bg-transparent rounded-md px-4 py-1 text-center flex flex-col items-center gap-150">
							<Button
								onClick={useTipHandler}
								variant="outline"
								className="h-auto flex gap-2 bg-muted border-primary/10 hover:bg-primary/10 cursor-pointer"
								asChild
							>
								<div className="text-left">
									<span className="block cursor-pointer">
										{getTranslation('UseTip', selectedLanguage)}
									</span>
								</div>
							</Button>
						</div>
					)}
					<div className="mt-4">
						<div className="space-y-2">
 {status !== 'over' && savedRevealedTips[today] && !savedRevealedTips[today].items.every(item =>
          corrects.some(connection => connection.items.includes(item))
        ) && savedRevealedTips[today].items.map((item, index) => (
          <motion.div
            key={index}
            style={{
              "--color": savedRevealedTips[today].connection?.color,
            } as React.CSSProperties}
            className="h-[20px] opacity-1 sm:h-[30px] text-xs sm:text-base flex flex-col items-center justify-center bg-[var(--color)] rounded-md"
          >
            <p>{item}</p>
          </motion.div>
        ))}

							{corrects.map((connection) => (
								<motion.div
									key= {getTranslation(connection.name || 'DefaultName', selectedLanguage)}
									style={
										{
											"--color": connection.color,
										} as React.CSSProperties
									}
									className="h-[50.38px] opacity-0 sm:h-[78.42px] text-xs sm:text-base flex flex-col items-center justify-center bg-[var(--color)] rounded-md"
									animate={{ opacity: 1 }}
								>
									<span className="font-bold">
										{getTranslation(connection.name || 'DefaultName', selectedLanguage)}
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
				{getTranslation('Informations', selectedLanguage)}
			</p>
		</div>
	);
}
