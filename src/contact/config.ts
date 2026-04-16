import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "Contact",
		collapsed: false,
		items: [{ text: "Overview", link: "/contact/" }]
	}
];

export default sidebar;