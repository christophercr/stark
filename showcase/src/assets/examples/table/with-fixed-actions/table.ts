import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkTableColumnProperties, StarkTableFilter, StarkTableRowActions } from "@nationalbankbelgium/stark-ui";

const DUMMY_DATA: object[] = [
	{
		id: 1,
		title: { label: "first title (value: 1)", value: 1 },
		description: "number one",
		info: "This is some info.",
		more_info: "This is even more info.",
		even_more_info: "This is a ludicrous amount of info."
	},
	/*...*/
	{
		id: 44,
		title: { label: "twelfth title (value: 12)", value: 12 },
		description: "the twelfth description",
		info: "This is some info.",
		more_info: "This is even more info.",
		even_more_info: "This is a ludicrous amount of info."
	}
];

@Component({
	selector: "showcase-table-with-fixed-actions",
	templateUrl: "./table-with-fixed-actions.component.html",
	styleUrls: ["./table-with-fixed-actions.component.scss"]
})
export class TableWithFixedActionsComponent implements OnInit {
	public data: object[];

	public columns: StarkTableColumnProperties[];

	public filter: StarkTableFilter;

	public tableRowActions: StarkTableRowActions;

	public constructor(@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.data = DUMMY_DATA;

		this.columns = [
			{ name: "id", label: "Id" },
			{
				name: "title",
				label: "Title",
				cellFormatter: (value: { label: string }): string => "~" + value.label
			},
			{ name: "description", label: "Description" },
			{ name: "info", label: "Extra info" },
			{ name: "more_info", label: "Extra info" },
			{ name: "even_more_info", label: "Extra info" }
		];

		this.filter = { globalFilterPresent: false, columns: [] };

		this.tableRowActions = {
			actions: [
				{
					id: "edit-item",
					label: "Edit",
					icon: "pencil",
					actionCall: ($event: Event, data: object) => this.logger.debug("EDIT", $event, data),
					isEnabled: true
				},
				{
					id: "delete-item",
					label: "Delete",
					icon: "delete",
					actionCall: ($event: Event, data: object) => this.logger.debug("DELETE", $event, data),
					isEnabled: true
				}
			],
			isFixed: true
		};
	}
}
