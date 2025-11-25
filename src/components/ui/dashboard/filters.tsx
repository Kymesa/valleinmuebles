import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconMapPin, IconSearch } from "@tabler/icons-react";

interface FiltersProps {
    filters: {
        propertyType: string;
        operationType: string;
        minPrice: string;
        maxPrice: string;
        city: string;
        nearMe: boolean;
    };
    setFilters: (filters: any) => void;
    propertyTypes: any[];
    operationTypes: any[];
    onSearch: () => void;
}

export const Filters = ({
    filters,
    setFilters,
    propertyTypes,
    operationTypes,
    onSearch,
}: FiltersProps) => {
    const handleChange = (key: string, value: any) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                    <div className="relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Buscar por ciudad"
                            className="pl-10"
                            value={filters.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                        />
                    </div>
                </div>

                <Select
                    value={filters.propertyType}
                    onValueChange={(val) => handleChange("propertyType", val)}
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Tipo de Inmueble" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {propertyTypes.map((type) => (
                            <SelectItem key={type.id} value={String(type.id)}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.operationType}
                    onValueChange={(val) => handleChange("operationType", val)}
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Tipo de Operación" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {operationTypes.map((type) => (
                            <SelectItem key={type.id} value={String(type.id)}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    variant={filters.nearMe ? "default" : "outline"}
                    onClick={() => {
                        const newValue = !filters.nearMe;
                        handleChange("nearMe", newValue);
                        // We need to pass the new value because setFilters is async/batched
                        // But onSearch uses the state from the parent. 
                        // Actually, the parent's getPosts uses the 'filters' state.
                        // If we call onSearch() immediately, 'filters' in parent might not be updated yet due to closure/batching.
                        // Better approach: The parent should handle the toggle and search.
                        // For now, let's use a timeout or assume the parent handles it if we pass the new filters to onSearch?
                        // No, onSearch takes no arguments in the interface.
                        // Let's just update the parent to use useEffect on filters.nearMe or similar.
                        // OR, we can just let the user click Apply. 
                        // But the user said "precione cerca de mi ... y nada".
                        // I will assume they expect immediate reaction.
                        // I will modify this to call a specific prop onNearMeChange if I can, or just rely on the user clicking Apply.
                        // Wait, if I change the onClick to:
                        // handleChange("nearMe", !filters.nearMe); setTimeout(onSearch, 0);
                        // That might still use old state in getPosts closure if not careful.
                        // Actually, getPosts uses `filters` state. `setFilters` triggers re-render. 
                        // But `onSearch` (getPosts) is a function created in the render scope.
                        // If I call onSearch from here, it's the one passed down.
                        // If I call it immediately, it might close over the OLD filters if it wasn't recreated?
                        // No, getPosts is recreated on every render of Dashboard unless wrapped in useCallback.
                        // It is NOT wrapped in useCallback in Dashboard.
                        // So if I call setFilters, Dashboard re-renders, passes new onSearch.
                        // But I can't call the *new* onSearch until the re-render happens.
                        // So calling onSearch() right after handleChange() here will call the OLD onSearch with OLD filters scope.
                        // So it won't work.

                        // Solution: Add a useEffect in Dashboard that listens to filters.nearMe changes and triggers getPosts.
                    }}
                    className="w-full md:w-auto"
                >
                    <IconMapPin className="w-4 h-4 mr-2" />
                    Cerca de mí
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-sm text-gray-500 whitespace-nowrap">Precio:</span>
                    <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleChange("minPrice", e.target.value)}
                        className="w-full md:w-32"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleChange("maxPrice", e.target.value)}
                        className="w-full md:w-32"
                    />
                </div>

                <div className="flex-1"></div>

                <Button onClick={onSearch} className="w-full md:w-auto bg-[#7168D3] hover:bg-[#5d57b5]">
                    Aplicar Filtros
                </Button>
            </div>
        </div>
    );
};
