import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "Funding",
		collapsed: false,
		items: [{ text: "Overview", link: "/funding/" }]
	}
];

export default sidebar;
