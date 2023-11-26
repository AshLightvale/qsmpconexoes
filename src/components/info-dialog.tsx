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

interface InfoDialogProps {
  selectedLanguage: string;
}

type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
  es: { [key: string]: string };
  fr: { [key: string]: string };
	
  [key: string]: { [key: string]: string };
};

const translations: Translations = {
  	en: {
    		Information1: 'You must form groups of <strong><b>4 words</b></strong> that are related by clicking on the words.',
    		Information2: 'When forming the group, the result will be revealed, whether you got it right or not. If you got it <strong>right</strong>, the category will be revealed, <strong>otherwise</strong>, just try again.',
    		About: 'About',
    		Inspired: 'Inspired by <a href="https://conexo.ws/" target="_blank" class="text-primary hover:underline active:underline">CONEXO</a> and <a href="https://conexaoop.vercel.app/" target="_blank" class="text-primary hover:underline active:underline">CONEXÃO PARANORMAL</a>',
    		Programming: 'Programming and Site originally made by <a href="https://twitter.com/feeeyli" target="_blank" class="text-[#FFA4CF] underline">Feyli</a>.',
    		Currently: 'Currently being updated by <a href="https://twitter.com/AshLightvale" target="_blank" class="text-[#FFA4CF] underline">AshLightvale</a>.',
	    	Made: 'Made with <a target="_blank" class="text-[#FFA4CF]">love</a>, for the entire QSMP community!',
  	},
    	pt: {
      		Information1: 'Você deve formar grupos de <strong><b>4 palavras</b></strong> que tenham ligação entre elas clicando nas palavras.',
      		Information2: 'Ao formar o grupo o resultado será revelado, se você acertou ou não. Caso tenha <strong>acertado</strong>, a categoria será revelada, <strong>senão</strong>, apenas tente novamente.',
		About: 'Sobre',
		Inspired: 'Inspirado por <a href="https://conexo.ws/" target="_blank" class="text-primary hover:underline active:underline">CONEXO</a> e <a href="https://conexaoop.vercel.app/" target="_blank" class="text-primary hover:underline active:underline">CONEXÃO PARANORMAL</a>',
		Programming: 'Programação e Site originalmente feito por <a href="https://twitter.com/feeeyli" target="_blank" class="text-[#FFA4CF] underline">Feyli</a>.',
		Currently: 'Sendo atualizado por <a href="https://twitter.com/AshLightvale" target="_blank" class="text-[#FFA4CF] underline">AshLightvale</a>.',
		Made: 'Feito com <a target="_blank" class="text-[#FFA4CF]">amor</a>, para toda comunidade do QSMP!',
    	},
  	es: {
    		Information1: 'Debes formar grupos de <strong><b>4 palabras</b></strong> que estén relacionadas haciendo clic en las palabras.',
    		Information2: 'Al formar el grupo, se revelará el resultado. Si has <strong>acertado</strong>, se revelará la categoría; <strong>si no</strong>, simplemente inténtalo de nuevo.',
    		About: 'Sobre',
    		Inspired: 'Inspirado por <a href="https://conexo.ws/" target="_blank" class="text-primary hover:underline active:underline">CONEXO</a> y <a href="https://conexaoop.vercel.app/" target="_blank" class="text-primary hover:underline active:underline">CONEXÃO PARANORMAL</a>',
    		Programming: 'Programación y sitio originalmente hecho por <a href="https://twitter.com/feeeyli" target="_blank" class="text-[#FFA4CF] underline">Feyli</a>.',
    		Currently: 'Actualmente siendo actualizado por <a href="https://twitter.com/AshLightvale" target="_blank" class="text-[#FFA4CF] underline">AshLightvale</a>.',
    		Made: 'Hecho con <a target="_blank" class="text-[#FFA4CF]">amor</a>, para toda la comunidad de QSMP!',
  	},
  	fr: {
    		Information1: 'Vous devez former des groupes de <strong><b>4 mots</b></strong> qui sont liés en cliquant sur les mots.',
    		Information2: "En formant le groupe, le résultat sera révélé. Si vous avez fait correspondre <strong>correctement</strong> les mots, la catégorie sera révélée ; <strong>sinon</strong>, réessayez simplement.",
    		About: 'À propos',
    		Inspired: 'Inspiré par <a href="https://conexo.ws/" target="_blank" class="text-primary hover:underline active:underline">CONEXO</a> et <a href="https://conexaoop.vercel.app/" target="_blank" class="text-primary hover:underline active:underline">CONEXÃO PARANORMAL</a>',
    		Programming: 'Programmation et site initialement réalisés par <a href="https://twitter.com/feeeyli" target="_blank" class="text-[#FFA4CF] underline">Feyli</a>.',
    		Currently: 'En cours de mise à jour par <a href="https://twitter.com/AshLightvale" target="_blank" class="text-[#FFA4CF] underline">AshLightvale</a>.',
   		Made: 'Fait avec <a target="_blank" class="text-[#FFA4CF]">amour</a>, pour toute la communauté de QSMP!',
 	},
    // Add more languages as needed
};

const getTranslation = (key: string, language: string = 'en'): React.ReactNode => {
  const translation = translations[language][key];

  if (translation) {
    // If the translation exists, parse the HTML tags using dangerouslySetInnerHTML
    return <div dangerouslySetInnerHTML={{ __html: translation }} />;
  }

  // If the translation doesn't exist, return the key as is
  return key;
};


export const InfoDialog = ({ selectedLanguage }: InfoDialogProps) => {
 	const { Information1, Information2, About } = translations[selectedLanguage] || translations.en;

	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<HelpCircle size="1.75rem" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{getTranslation('About', selectedLanguage)}</DialogTitle>
				</DialogHeader>
				<main className="[&_strong]:font-normal [&_strong]:text-primary">
					<p className="inline-block mb-2 indent-2">
						 {getTranslation('Information1', selectedLanguage)}
					</p>
					<p className="indent-2">
						 {getTranslation('Information2', selectedLanguage)}
					</p>
				</main>
				<footer>
					<p className="text-sm inline-block mb-1">
				 		 <span>
    							<span dangerouslySetInnerHTML={{ __html: translations[selectedLanguage].Inspired }} />
						  </span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center' }}>
						  <span>
    							<span dangerouslySetInnerHTML={{ __html: translations[selectedLanguage].Programming }} />
						  </span>
					</p>
					<p style={{ display: 'flex', alignItems: 'center' }}>
				 		 <span>
    							<span dangerouslySetInnerHTML={{ __html: translations[selectedLanguage].Currently }} />
						  </span>
					</p>
					<p className="text-sm [text-wrap:balance]">
					 	 <span>
    							<span dangerouslySetInnerHTML={{ __html: translations[selectedLanguage].Made }} />
						  </span>
					</p>
				</footer>
			</DialogContent>
		</Dialog>
	);
};
