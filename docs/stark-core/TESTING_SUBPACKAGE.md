# Stark Core Testing subpackage

> @nationalbankbelgium/stark-core/testing

Subpackage of Stark Core that contains the mock classes that come in hand when implementing unit tests that depend on
any of the main services provided by Stark Core.

## Mock Classes

The mock classes provided by this subpackage are the following:

-   [MockStarkHttpService](https://stark.nbb.be/api-docs/stark-core/latest/classes/MockStarkHttpService.html)
-   [MockStarkLoggingService](https://stark.nbb.be/api-docs/stark-core/latest/classes/MockStarkLoggingService.html)
-   [MockStarkRoutingService](https://stark.nbb.be/api-docs/stark-core/latest/classes/MockStarkRoutingService.html)
-   [MockStarkSessionService](https://stark.nbb.be/api-docs/stark-core/latest/classes/MockStarkSessionService.html)
-   [MockStarkUserService](https://stark.nbb.be/api-docs/stark-core/latest/classes/MockStarkUserService.html)
-   [MockStarkXsrfService](https://stark.nbb.be/api-docs/stark-core/latest/classes/MockStarkXsrfService.html)

## Usage

The mock classes of this subpackage can be imported as follows:

```typescript
import { MockStarkSessionService } from "@nationalbankbelgium/stark-core/testing";
```

The mock classes implement the base interface of the service they mock. So you just need provide the mock in your `TestingModule`:

```typescript
TestBed.configureTestingModule({
    imports: [...],
    declarations: [...],
    providers: [
        ...
        { provide: STARK_SESSION_SERVICE, useValue: new MockStarkSessionService() },
        ...
    ]
});
```

Then you can just inject the Stark service via the TestBed using its corresponding `InjectionToken`:

```typescript
// this will inject the instantiated mock class
mockSessionService = TetBed.get(STARK_SESSION_SERVICE);
```

In fact, every method of the base interface is simply mocked
with a [Jasmine Spy](https://jasmine.github.io/api/3.5/Spy.html) which can then be used in the unit tests to:

-   return custom values
-   override a method with a custom function
-   asserting that they are actually called
-   do any other operation than can be performed with an Spy.

For example:

```typescript
// returning custom value
mockSessionService.getCurrentLanguage.and.returnValue(of("fr"));

// overriding a method with a custom function
mockSessionService.getCurrentLanguage.and.callFake(() => {
	// some custom logic to return a specific value
});

// asserting that a method was indeed called
expect(mockSessionService.setCurrentLanguage).toHaveBeenCalledTimes(1);
expect(mockSessionService.setCurrentLanguage).toHaveBeenCalledWith("nl");
```
