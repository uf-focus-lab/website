import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "Facilities",
		collapsed: false,
		items: [{ text: "Overview", link: "/facilities/" }]
	}
];

export default sidebar;
