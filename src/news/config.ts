import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "News",
		collapsed: false,
		items: [{ text: "Overview", link: "/news/" }]
	}
];

export default sidebar;
