import SearchCard from "./SearchCard";

export default function SearchResults() {

    const searchResults = [
        {
            name: "Fakultní nemocnice",
            address: "Královopolská 135, 612 00 Brno",
            phone: "+420 532 233 111",
        },
        {
            name: "Ordinace praktického lékaře pro dospělé",
            address: "Královopolská 135, 612 00 Brno",
            phone: "+420 532 233 111",
        }
    ]
    const searchCards = searchResults.map((result) => {
        return <SearchCard name={result.name} address={result.address} phone={result.phone} />
    });
    
	return (
        <div className="flex-col flex gap-4">
            {searchCards}
        </div>
    )
}
