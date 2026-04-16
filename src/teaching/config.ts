import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "Teaching",
		collapsed: false,
		items: [{ text: "Overview", link: "/teaching/" }]
	}
];

export default sidebar;
