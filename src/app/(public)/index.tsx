import { setMetadata } from "@/common/utils/set-metadata";
import { Box } from "@/components/ui";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";
import ContactSection from "./_components/-contact-section";
import FAQsSection from "./_components/-faq-sections";
import FeaturesSection from "./_components/-features-section";
import Footer from "./_components/-footer";
import GridBackground from "./_components/-grid-background";
import Header from "./_components/-header";
import HeroSection from "./_components/-hero-section";
import Spotlight from "./_components/-spotlight";
import SupportSection from "./_components/-support-section";

export const Route = createFileRoute("/(public)/")({
	beforeLoad: () => {
		setMetadata({
			title: "GreenLand HRM System",
			description: "GreenLand HRM is Human Resource Management System "
		});
	},
	component: HomePage
});

export default function HomePage() {
	return (
		<Box className='relative scroll-m-2 scroll-smooth bg-background text-foreground antialiased scrollbar-none'>
			<Header />
			<Spotlight className='fixed -top-[20%] left-[10%] z-0' />
			<GridBackground />
			<Box className='mb-20 space-y-64'>
				<HeroSection />
				<FeaturesSection />
				<SupportSection />
				<FAQsSection />
				<ContactSection />
			</Box>
			<Footer />
		</Box>
	);
}

export function useScrollIntoView({
	hashMatch,
	target,
	block = "center"
}: {
	hashMatch: string;
	target: HTMLDivElement | null;
	block?: ScrollIntoViewOptions["block"];
}) {
	const { location } = useRouterState();

	useEffect(() => {
		if (target && location.hash === hashMatch) {
			target.scrollIntoView({
				block: block,
				behavior: "smooth"
			});
		}
	}, [location.hash]);
}
