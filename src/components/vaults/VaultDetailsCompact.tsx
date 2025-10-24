import { Vault } from "@/database/dao/vaultsDAO";

type Props = {
	vault: Vault;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
};

export default function VaultDetailsCompact(props: Props) {
	return (
		<div
			className={`group flex flex-col px-3 py-1 ${
				props.isSelected ? "bg-blue-900" : "bg-gray-800 hover:bg-gray-700"
			} rounded-lg shadow hover:cursor-pointer ${props.className}`}
			onClick={props.onClick}
		>
			<div className={`flex flex-row items-center justify-between`}>
				<h3 className={"text-lg"}>{props.vault.name}</h3>
			</div>
			{props.vault.url && <div className="text-mg truncate text-gray-400">{props.vault.url}</div>}
		</div>
	);
}
