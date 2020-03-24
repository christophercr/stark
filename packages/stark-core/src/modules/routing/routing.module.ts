import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { UIRouterModule } from "@uirouter/angular";
import { STARK_ROUTING_SERVICE, StarkRoutingServiceImpl } from "./services";

@NgModule({
	imports: [UIRouterModule.forChild()]
})
export class StarkRoutingModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://v7.angular.io/guide/singleton-services#the-forroot-pattern
	 * @returns A module with providers
	 */
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: StarkRoutingModule,
			providers: [{ provide: STARK_ROUTING_SERVICE, useClass: StarkRoutingServiceImpl }]
		};
	}

	/**
	 * Prevents this module from being re-imported
	 * @link https://v7.angular.io/guide/singleton-services#prevent-reimport-of-the-greetingmodule
	 * @param parentModule - The parent module
	 */
	public constructor(
		@Optional()
		@SkipSelf()
		parentModule: StarkRoutingModule
	) {
		if (parentModule) {
			throw new Error("StarkRoutingModule is already loaded. Import it in the AppModule only");
		}
	}
}
