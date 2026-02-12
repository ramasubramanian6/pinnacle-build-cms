
export interface Episode {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    isPremium: boolean;
}

export interface Ebook {
    title: string;
    pages: number;
    images: number;
    drawings: number;
    format: string;
    size: string;
    url: string; // Mock URL
}

export interface Product {
    category: string;
    brand: string;
    items?: string[];
}

export interface ProjectTeam {
    principalArchitect: string;
    firm: string;
    photoCredit: string;
    cinematographer?: string;
}

export interface ExtendedProjectData {
    id: string; // Matches the project ID
    subtitle: string;
    plotArea: string;
    facing: string;
    vastu: string;
    rooms: number;
    parking: number;
    builtUpArea: string;
    startDate: string;
    completionDate: string;
    costPerSqFt: string; // This will be masked
    team: ProjectTeam;
    episodes: Episode[];
    ebook: Ebook;
    products: Product[];
}

// Default mock data that fits the "Sharada" description
export const getExtendedProjectData = (projectId: string): ExtendedProjectData => {
    return {
        id: projectId,
        subtitle: "Bengaluru | Karnataka",
        plotArea: "2250 sq. ft.",
        facing: "East",
        vastu: "No",
        rooms: 4,
        parking: 2,
        builtUpArea: "4800 sq. ft.",
        startDate: "2022",
        completionDate: "2024",
        costPerSqFt: "4500", // Example value to be masked
        team: {
            principalArchitect: "Kavya",
            firm: "Kuoo Architects",
            photoCredit: "Studio Recall",
            cinematographer: "Shahul Shibili (Turtle Arts)",
        },
        episodes: [
            { id: "1", title: "Official Promo", duration: "01:06", thumbnail: "/placeholder.svg", isPremium: false },
            { id: "2", title: "Full Video", duration: "10:15", thumbnail: "/placeholder.svg", isPremium: true },
            { id: "3", title: "Library", duration: "01:20", thumbnail: "/placeholder.svg", isPremium: true },
            { id: "4", title: "Terrace Garden", duration: "03:07", thumbnail: "/placeholder.svg", isPremium: true },
            { id: "5", title: "Bedrooms", duration: "01:59", thumbnail: "/placeholder.svg", isPremium: true },
        ],
        ebook: {
            title: "Full eBook",
            pages: 52,
            images: 25,
            drawings: 5,
            format: "PDF",
            size: "29.5 MB",
            url: "#",
        },
        products: [
            { category: "Roofing", brand: "Armstrong" },
            { category: "Cement", brand: "Mahacement" },
            { category: "Brick", brand: "TerraGrid" },
            { category: "Glass", brand: "Saint-Gobain" },
            { category: "Hardware", brand: "Hafele" },
            { category: "Pivot Door Hardware", brand: "Hafele" },
            { category: "Tiles", brand: "Ceramics" },
            { category: "Lighting", brand: "DannyLight" },
            { category: "Sanitaryware", brand: "Villeroy & Boch" },
            { category: "Bath Flooring", brand: "Ceramics" },
            { category: "Sofas", brand: "Natuzzi" },
            { category: "Chairs", brand: "Stanley" },
            { category: "Curtains", brand: "Kurlon" },
            { category: "Blinds", brand: "Kurlon" },
            { category: "Kitchen Sink", brand: "Reginox" },
            { category: "Kitchen Chimney", brand: "Seimens" },
            { category: "Kitchen Appliances", brand: "Gaggenau" },
            { category: "Ply", brand: "Greenply" },
            { category: "Veneer", brand: "Greenply" },
            { category: "Designer Fans", brand: "Windflower" },
            { category: "Switches", brand: "Legrand" },
            { category: "Elevators", brand: "Schindler" },
            { category: "Smart Locks", brand: "Yale" },
        ]
    };
};
