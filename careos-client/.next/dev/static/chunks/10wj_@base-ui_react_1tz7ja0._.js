(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeEventPreventable",
    ()=>makeEventPreventable,
    "mergeClassNames",
    ()=>mergeClassNames,
    "mergeProps",
    ()=>mergeProps,
    "mergePropsN",
    ()=>mergePropsN
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeObjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/mergeObjects.mjs [app-client] (ecmascript)");
;
const EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
    if (!c && !d && !e && !a) {
        return createInitialMergedProps(b);
    }
    // We need to mutably own `merged`.
    let merged = createInitialMergedProps(a);
    if (b) {
        merged = mergeInto(merged, b);
    }
    if (c) {
        merged = mergeInto(merged, c);
    }
    if (d) {
        merged = mergeInto(merged, d);
    }
    if (e) {
        merged = mergeInto(merged, e);
    }
    return merged;
}
function mergePropsN(props) {
    if (props.length === 0) {
        return EMPTY_PROPS;
    }
    if (props.length === 1) {
        return createInitialMergedProps(props[0]);
    }
    // We need to mutably own `merged`.
    let merged = createInitialMergedProps(props[0]);
    for(let i = 1; i < props.length; i += 1){
        merged = mergeInto(merged, props[i]);
    }
    return merged;
}
function createInitialMergedProps(inputProps) {
    if (isPropsGetter(inputProps)) {
        // Getter-returned handlers intentionally keep their existing semantics.
        return {
            ...resolvePropsGetter(inputProps, EMPTY_PROPS)
        };
    }
    return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
    if (isPropsGetter(inputProps)) {
        return resolvePropsGetter(inputProps, merged);
    }
    return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
    const copiedProps = {
        ...inputProps
    };
    // `copiedProps` is our fresh own-object copy, so iterating with `for...in` is safe here.
    // eslint-disable-next-line guard-for-in
    for(const propName in copiedProps){
        const propValue = copiedProps[propName];
        if (isEventHandler(propName, propValue)) {
            copiedProps[propName] = wrapEventHandler(propValue);
        }
    }
    return copiedProps;
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */ function mutablyMergeInto(mergedProps, externalProps) {
    if (!externalProps) {
        return mergedProps;
    }
    // eslint-disable-next-line guard-for-in
    for(const propName in externalProps){
        const externalPropValue = externalProps[propName];
        switch(propName){
            case 'style':
                {
                    mergedProps[propName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeObjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(mergedProps.style, externalPropValue);
                    break;
                }
            case 'className':
                {
                    mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
                    break;
                }
            default:
                {
                    if (isEventHandler(propName, externalPropValue)) {
                        mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
                    } else {
                        mergedProps[propName] = externalPropValue;
                    }
                }
        }
    }
    return mergedProps;
}
function isEventHandler(key, value) {
    // This approach is more efficient than using a regex.
    const code0 = key.charCodeAt(0);
    const code1 = key.charCodeAt(1);
    const code2 = key.charCodeAt(2);
    return code0 === 111 /* o */  && code1 === 110 /* n */  && code2 >= 65 /* A */  && code2 <= 90 /* Z */  && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
    return typeof inputProps === 'function';
}
function resolvePropsGetter(inputProps, previousProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(previousProps);
    }
    return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
    if (!theirHandler) {
        return ourHandler;
    }
    if (!ourHandler) {
        return wrapEventHandler(theirHandler);
    }
    return (...args)=>{
        const event = args[0];
        if (isSyntheticEvent(event)) {
            const baseUIEvent = event;
            makeEventPreventable(baseUIEvent);
            const result = theirHandler(...args);
            if (!baseUIEvent.baseUIHandlerPrevented) {
                ourHandler?.(...args);
            }
            return result;
        }
        const result = theirHandler(...args);
        ourHandler?.(...args);
        return result;
    };
}
function wrapEventHandler(handler) {
    if (!handler) {
        return handler;
    }
    return (...args)=>{
        const event = args[0];
        if (isSyntheticEvent(event)) {
            makeEventPreventable(event);
        }
        return handler(...args);
    };
}
function makeEventPreventable(event) {
    event.preventBaseUIHandler = ()=>{
        event.baseUIHandlerPrevented = true;
    };
    return event;
}
function mergeClassNames(ourClassName, theirClassName) {
    if (theirClassName) {
        if (ourClassName) {
            // eslint-disable-next-line prefer-template
            return theirClassName + ' ' + ourClassName;
        }
        return theirClassName;
    }
    return ourClassName;
}
function isSyntheticEvent(event) {
    return event != null && typeof event === 'object' && 'nativeEvent' in event;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRootContext",
    ()=>CompositeRootContext,
    "useCompositeRootContext",
    ()=>useCompositeRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CompositeRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CompositeRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusableWhenDisabled",
    ()=>useFocusableWhenDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFocusableWhenDisabled.useMemo[props]": ()=>{
            const additionalProps = {
                // allow Tabbing away from focusableWhenDisabled elements
                onKeyDown (event) {
                    if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                        event.preventDefault();
                    }
                }
            };
            if (!composite) {
                additionalProps.tabIndex = tabIndexProp;
                if (!isNativeButton && disabled) {
                    additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
                }
            }
            if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
                additionalProps['aria-disabled'] = disabled;
            }
            if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
                additionalProps.disabled = disabled;
            }
            return additionalProps;
        }
    }["useFocusableWhenDisabled.useMemo[props]"], [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useButton",
    ()=>useButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/safeReact.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$composite$2f$root$2f$CompositeRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useFocusableWhenDisabled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true, composite: compositeProp } = parameters;
    const elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const compositeRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$composite$2f$root$2f$CompositeRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRootContext"])(true);
    const isCompositeItem = compositeProp ?? compositeRootContext !== undefined;
    const { props: focusableWhenDisabledProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useFocusableWhenDisabled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusableWhenDisabled"])({
        focusableWhenDisabled,
        disabled,
        composite: isCompositeItem,
        tabIndex,
        isNativeButton
    });
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
            "useButton.useEffect": ()=>{
                if (!elementRef.current) {
                    return;
                }
                const isButtonTag = isButtonElement(elementRef.current);
                if (isNativeButton) {
                    if (!isButtonTag) {
                        const ownerStackMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeReact"].captureOwnerStack?.() || '';
                        const message = 'A component that acts as a button expected a native <button> because the ' + '`nativeButton` prop is true. Rendering a non-<button> removes native button ' + 'semantics, which can impact forms and accessibility. Use a real <button> in the ' + '`render` prop, or set `nativeButton` to `false`.';
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${message}${ownerStackMessage}`);
                    }
                } else if (isButtonTag) {
                    const ownerStackMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeReact"].captureOwnerStack?.() || '';
                    const message = 'A component that acts as a button expected a non-<button> because the `nativeButton` ' + 'prop is false. Rendering a <button> keeps native behavior while Base UI applies ' + 'non-native attributes and handlers, which can add unintended extra attributes (such ' + 'as `role` or `aria-disabled`). Use a non-<button> in the `render` prop, or set ' + '`nativeButton` to `true`.';
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${message}${ownerStackMessage}`);
                }
            }
        }["useButton.useEffect"], [
            isNativeButton
        ]);
    }
    // handles a disabled composite button rendering another button, e.g.
    // <Toolbar.Button disabled render={<Menu.Trigger />} />
    // the `disabled` prop needs to pass through 2 `useButton`s then finally
    // delete the `disabled` attribute from DOM
    const updateDisabled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[updateDisabled]": ()=>{
            const element = elementRef.current;
            if (!isButtonElement(element)) {
                return;
            }
            if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
                element.disabled = false;
            }
        }
    }["useButton.useCallback[updateDisabled]"], [
        disabled,
        focusableWhenDisabledProps.disabled,
        isCompositeItem
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(updateDisabled, [
        updateDisabled
    ]);
    const getButtonProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[getButtonProps]": (externalProps = {})=>{
            const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
                onClick (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnClick?.(event);
                },
                onMouseDown (event) {
                    if (!disabled) {
                        externalOnMouseDown?.(event);
                    }
                },
                onKeyDown (event) {
                    if (disabled) {
                        return;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                    externalOnKeyDown?.(event);
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    const isCurrentTarget = event.target === event.currentTarget;
                    const currentTarget = event.currentTarget;
                    const isButton = isButtonElement(currentTarget);
                    const isLink = !isNativeButton && isValidLinkElement(currentTarget);
                    const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
                    const isEnterKey = event.key === 'Enter';
                    const isSpaceKey = event.key === ' ';
                    const role = currentTarget.getAttribute('role');
                    const isTextNavigationRole = role?.startsWith('menuitem') || role === 'option' || role === 'gridcell';
                    if (isCurrentTarget && isCompositeItem && isSpaceKey) {
                        if (event.defaultPrevented && isTextNavigationRole) {
                            return;
                        }
                        event.preventDefault();
                        if (isLink || isNativeButton && isButton) {
                            currentTarget.click();
                            event.preventBaseUIHandler();
                        } else if (shouldClick) {
                            externalOnClick?.(event);
                            event.preventBaseUIHandler();
                        }
                        return;
                    }
                    // Keyboard accessibility for native and non-native elements.
                    if (shouldClick) {
                        if (!isNativeButton && (isSpaceKey || isEnterKey)) {
                            event.preventDefault();
                        }
                        if (!isNativeButton && isEnterKey) {
                            externalOnClick?.(event);
                        }
                    }
                },
                onKeyUp (event) {
                    if (disabled) {
                        return;
                    }
                    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
                    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                    externalOnKeyUp?.(event);
                    if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === ' ') {
                        event.preventDefault();
                        return;
                    }
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    // Keyboard accessibility for non interactive elements
                    if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === ' ') {
                        externalOnClick?.(event);
                    }
                },
                onPointerDown (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnPointerDown?.(event);
                }
            }, isNativeButton ? {
                type: 'button'
            } : {
                role: 'button'
            }, focusableWhenDisabledProps, otherExternalProps);
        }
    }["useButton.useCallback[getButtonProps]"], [
        disabled,
        focusableWhenDisabledProps,
        isCompositeItem,
        isNativeButton
    ]);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useButton.useStableCallback[buttonRef]": (element)=>{
            elementRef.current = element;
            updateDisabled();
        }
    }["useButton.useStableCallback[buttonRef]"]);
    return {
        getButtonProps,
        buttonRef
    };
}
function isButtonElement(elem) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(elem) && elem.tagName === 'BUTTON';
}
function isValidLinkElement(elem) {
    return Boolean(elem?.tagName === 'A' && elem?.href);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStateAttributesProps",
    ()=>getStateAttributesProps
]);
function getStateAttributesProps(state, customMapping) {
    const props = {};
    /* eslint-disable-next-line guard-for-in */ for(const key in state){
        const value = state[key];
        if (customMapping?.hasOwnProperty(key)) {
            const customProps = customMapping[key](value);
            if (customProps != null) {
                Object.assign(props, customProps);
            }
            continue;
        }
        if (value === true) {
            props[`data-${key.toLowerCase()}`] = '';
        } else if (value) {
            props[`data-${key.toLowerCase()}`] = value.toString();
        }
    }
    return props;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/resolveClassName.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */ __turbopack_context__.s([
    "resolveClassName",
    ()=>resolveClassName
]);
function resolveClassName(className, state) {
    return typeof className === 'function' ? className(state) : className;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/resolveStyle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */ __turbopack_context__.s([
    "resolveStyle",
    ()=>resolveStyle
]);
function resolveStyle(style, state) {
    return typeof style === 'function' ? style(state) : style;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRenderElement",
    ()=>useRenderElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useMergedRefs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$getReactElementRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/getReactElementRef.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeObjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/mergeObjects.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$warn$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/warn.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$getStateAttributesProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveClassName$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/resolveClassName.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveStyle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/resolveStyle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
function useRenderElement(element, componentProps, params = {}) {
    const renderProp = componentProps.render;
    const outProps = useRenderElementProps(componentProps, params);
    if (params.enabled === false) {
        return null;
    }
    const state = params.state ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    return evaluateRenderProp(element, renderProp, outProps, state);
}
/**
 * Computes render element final props.
 */ function useRenderElementProps(componentProps, params = {}) {
    const { className: classNameProp, style: styleProp, render: renderProp } = componentProps;
    const { state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], ref, props, stateAttributesMapping, enabled = true } = params;
    const className = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveClassName$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveClassName"])(classNameProp, state) : undefined;
    const style = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveStyle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStyle"])(styleProp, state) : undefined;
    const stateProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$getStateAttributesProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStateAttributesProps"])(state, stateAttributesMapping) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : undefined;
    // Ensure outProps is always a new mutable object when enabled, never EMPTY_OBJECT.
    // This prevents potential TypeError when setting ref, className, or style properties,
    // since EMPTY_OBJECT is frozen and mutations would fail in strict mode.
    const outProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeObjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(stateProps, resolvedProps) ?? {} : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
    // switching between them at runtime is safe. If this assertion fails, React will
    // throw at runtime anyway.
    // This also skips the `useMergedRefs` call on the server, which is fine because
    // refs are not used on the server side.
    /* eslint-disable react-hooks/rules-of-hooks */ if (typeof document !== 'undefined') {
        if (!enabled) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(null, null);
        } else if (Array.isArray(ref)) {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefsN"])([
                outProps.ref,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$getReactElementRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactElementRef"])(renderProp),
                ...ref
            ]);
        } else {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useMergedRefs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(outProps.ref, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$getReactElementRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactElementRef"])(renderProp), ref);
        }
    }
    if (!enabled) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    }
    if (className !== undefined) {
        outProps.className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClassNames"])(outProps.className, className);
    }
    if (style !== undefined) {
        outProps.style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$mergeObjects$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(outProps.style, style);
    }
    return outProps;
}
function resolveRenderFunctionProps(props) {
    if (Array.isArray(props)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergePropsN"])(props);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(undefined, props);
}
// The symbol React uses internally for lazy components
// https://github.com/facebook/react/blob/a0566250b210499b4c5677f5ac2eedbd71d51a1b/packages/shared/ReactSymbols.js#L31
//
// TODO delete once https://github.com/facebook/react/issues/32392 is fixed
const REACT_LAZY_TYPE = Symbol.for('react.lazy');
const COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
const LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function evaluateRenderProp(element, render, props, state) {
    if (render) {
        if (typeof render === 'function') {
            if ("TURBOPACK compile-time truthy", 1) {
                warnIfRenderPropLooksLikeComponent(render);
            }
            return render(props, state);
        }
        const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(props, render.props);
        mergedProps.ref = props.ref;
        let newElement = render;
        // Workaround for https://github.com/facebook/react/issues/32392
        // This works because the toArray() logic unwrap lazy element type in
        // https://github.com/facebook/react/blob/a0566250b210499b4c5677f5ac2eedbd71d51a1b/packages/react/src/ReactChildren.js#L186
        if (newElement?.$$typeof === REACT_LAZY_TYPE) {
            const children = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].toArray(render);
            newElement = children[0];
        }
        // There is a high number of indirections, the error message thrown by React.cloneElement() is
        // hard to use for developers, this logic provides a better context.
        //
        // Our general guideline is to never change the control flow depending on the environment.
        // However, React.cloneElement() throws if React.isValidElement() is false,
        // so we can throw before with custom message.
        if ("TURBOPACK compile-time truthy", 1) {
            if (!/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](newElement)) {
                // TODO: fix mui/no-guarded-throw
                // eslint-disable-next-line mui/no-guarded-throw
                throw new Error([
                    'Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.',
                    'A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.',
                    'https://base-ui.com/r/invalid-render-prop'
                ].join('\n'));
            }
        }
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](newElement, mergedProps);
    }
    if (element) {
        if (typeof element === 'string') {
            return renderTag(element, props);
        }
    }
    // Unreachable, but the typings on `useRenderElement` need to be reworked
    // to annotate it correctly.
    throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: Render element or function are not defined.' : "TURBOPACK unreachable");
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
    const functionName = renderFn.name;
    if (functionName.length === 0) {
        return;
    }
    if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) {
        return;
    }
    if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$warn$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warn"])(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, 'This usually means a React component was passed directly as `render={Component}`.', 'Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.', 'If this is an intentional render callback, rename it to start with a lowercase letter.', 'Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.', 'https://base-ui.com/r/invalid-render-prop');
}
function renderTag(Tag, props) {
    if (Tag === 'button') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("button", {
            type: "button",
            ...props,
            key: props.key
        });
    }
    if (Tag === 'img') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("img", {
            alt: "",
            ...props,
            key: props.key
        });
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](Tag, props);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/button/Button.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/use-button/useButton.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
'use client';
;
;
;
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function Button(componentProps, forwardedRef) {
    const { render, className, disabled = false, focusableWhenDisabled = false, nativeButton = true, style, ...elementProps } = componentProps;
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$use$2d$button$2f$useButton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        focusableWhenDisabled,
        native: nativeButton
    });
    const state = {
        disabled
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef
        ],
        props: [
            elementProps,
            getButtonProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) Button.displayName = "Button";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/index.parts.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldControlDataAttributes",
    ()=>FieldControlDataAttributes
]);
let FieldControlDataAttributes = /*#__PURE__*/ function(FieldControlDataAttributes) {
    /**
   * Present when the field is disabled.
   */ FieldControlDataAttributes["disabled"] = "data-disabled";
    /**
   * Present when the field is in a valid state.
   */ FieldControlDataAttributes["valid"] = "data-valid";
    /**
   * Present when the field is in an invalid state.
   */ FieldControlDataAttributes["invalid"] = "data-invalid";
    /**
   * Present when the field has been touched.
   */ FieldControlDataAttributes["touched"] = "data-touched";
    /**
   * Present when the field's value has changed.
   */ FieldControlDataAttributes["dirty"] = "data-dirty";
    /**
   * Present when the field is filled.
   */ FieldControlDataAttributes["filled"] = "data-filled";
    /**
   * Present when the field control is focused.
   */ FieldControlDataAttributes["focused"] = "data-focused";
    return FieldControlDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_FIELD_ROOT_STATE",
    ()=>DEFAULT_FIELD_ROOT_STATE,
    "DEFAULT_FIELD_STATE_ATTRIBUTES",
    ()=>DEFAULT_FIELD_STATE_ATTRIBUTES,
    "DEFAULT_VALIDITY_STATE",
    ()=>DEFAULT_VALIDITY_STATE,
    "fieldValidityMapping",
    ()=>fieldValidityMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$control$2f$FieldControlDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/control/FieldControlDataAttributes.mjs [app-client] (ecmascript)");
;
const DEFAULT_VALIDITY_STATE = {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: null,
    valueMissing: false
};
const DEFAULT_FIELD_STATE_ATTRIBUTES = {
    valid: null,
    touched: false,
    dirty: false,
    filled: false,
    focused: false
};
const DEFAULT_FIELD_ROOT_STATE = {
    disabled: false,
    ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
const fieldValidityMapping = {
    valid (value) {
        if (value === null) {
            return null;
        }
        if (value) {
            return {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$control$2f$FieldControlDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldControlDataAttributes"].valid]: ''
            };
        }
        return {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$control$2f$FieldControlDataAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldControlDataAttributes"].invalid]: ''
        };
    }
};
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_FIELD_ROOT_CONTEXT",
    ()=>DEFAULT_FIELD_ROOT_CONTEXT,
    "FieldRootContext",
    ()=>FieldRootContext,
    "useFieldRootContext",
    ()=>useFieldRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const DEFAULT_FIELD_ROOT_CONTEXT = {
    invalid: undefined,
    name: undefined,
    validityData: {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
        errors: [],
        error: '',
        value: '',
        initialValue: null
    },
    setValidityData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    disabled: undefined,
    touched: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FIELD_STATE_ATTRIBUTES"].touched,
    setTouched: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    dirty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FIELD_STATE_ATTRIBUTES"].dirty,
    setDirty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    filled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FIELD_STATE_ATTRIBUTES"].filled,
    setFilled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    focused: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FIELD_STATE_ATTRIBUTES"].focused,
    setFocused: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    validate: ()=>null,
    validationMode: 'onSubmit',
    validationDebounceTime: 0,
    shouldValidateOnChange: ()=>false,
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FIELD_ROOT_STATE"],
    markedDirtyRef: {
        current: false
    },
    registerFieldControl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    validation: {
        getValidationProps: (_disabled, props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"])=>props,
        inputRef: {
            current: null
        },
        registerInput: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
        commit: async ()=>{},
        change: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"]
    }
};
const FieldRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](DEFAULT_FIELD_ROOT_CONTEXT);
if ("TURBOPACK compile-time truthy", 1) FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FieldRootContext);
    if (context.setValidityData === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"] && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/fieldset/root/FieldsetRootContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldsetRootContext",
    ()=>FieldsetRootContext,
    "useFieldsetRootContext",
    ()=>useFieldsetRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const FieldsetRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FieldsetRootContext);
    if (!context && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormContext",
    ()=>FormContext,
    "useFormContext",
    ()=>useFormContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
'use client';
;
;
const FormContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    formRef: {
        current: {
            fields: new Map()
        }
    },
    errors: {},
    clearErrors: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    validationMode: 'onSubmit',
    submitAttemptedRef: {
        current: false
    }
});
if ("TURBOPACK compile-time truthy", 1) FormContext.displayName = "FormContext";
function useFormContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FormContext);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseUiId",
    ()=>useBaseUiId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useId.mjs [app-client] (ecmascript)");
'use client';
;
function useBaseUiId(idOverride) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(idOverride, 'base-ui');
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelableContext",
    ()=>LabelableContext,
    "useLabelableContext",
    ()=>useLabelableContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
'use client';
;
;
const LabelableContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    controlId: undefined,
    registerControlId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    labelId: undefined,
    setLabelId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    messageIds: [],
    setMessageIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"],
    getDescriptionProps: (externalProps)=>externalProps
});
if ("TURBOPACK compile-time truthy", 1) LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](LabelableContext);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabelableProvider",
    ()=>LabelableProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useRefWithInit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useRefWithInit.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const LabelableProvider = function LabelableProvider(props) {
    const defaultId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const initialControlId = props.controlId === undefined ? defaultId : props.controlId;
    const [controlId, setControlIdState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialControlId);
    const [labelId, setLabelId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](props.labelId);
    const [messageIds, setMessageIds] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const registrationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useRefWithInit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "LabelableProvider.useRefWithInit[registrationsRef]": ()=>new Map()
    }["LabelableProvider.useRefWithInit[registrationsRef]"]);
    const { messageIds: parentMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const registerControlId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "LabelableProvider.useStableCallback[registerControlId]": (source, nextId)=>{
            const registrations = registrationsRef.current;
            if (nextId === undefined) {
                registrations.delete(source);
                return;
            }
            registrations.set(source, nextId);
            // Only flush when registering, not when unregistering.
            // This prevents loops during rapid unmount/remount cycles (e.g. React Activity).
            // The next registration will pick up the correct state.
            setControlIdState({
                "LabelableProvider.useStableCallback[registerControlId]": (prev)=>{
                    if (registrations.size === 0) {
                        return undefined;
                    }
                    let nextControlId;
                    for (const id of registrations.values()){
                        if (prev !== undefined && id === prev) {
                            return prev;
                        }
                        if (nextControlId === undefined) {
                            nextControlId = id;
                        }
                    }
                    return nextControlId;
                }
            }["LabelableProvider.useStableCallback[registerControlId]"]);
        }
    }["LabelableProvider.useStableCallback[registerControlId]"]);
    const getDescriptionProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "LabelableProvider.useCallback[getDescriptionProps]": (externalProps)=>{
            const ids = externalProps['aria-describedby'] ? externalProps['aria-describedby'].split(' ') : [];
            ids.push(...parentMessageIds, ...messageIds);
            return {
                ...externalProps,
                'aria-describedby': Array.from(new Set(ids)).join(' ') || undefined
            };
        }
    }["LabelableProvider.useCallback[getDescriptionProps]"], [
        parentMessageIds,
        messageIds
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LabelableProvider.useMemo[contextValue]": ()=>({
                controlId,
                registerControlId,
                labelId,
                setLabelId,
                messageIds,
                setMessageIds,
                getDescriptionProps
            })
    }["LabelableProvider.useMemo[contextValue]"], [
        controlId,
        registerControlId,
        labelId,
        setLabelId,
        messageIds,
        setMessageIds,
        getDescriptionProps
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelableContext"].Provider, {
        value: contextValue,
        children: props.children
    });
};
if ("TURBOPACK compile-time truthy", 1) LabelableProvider.displayName = "LabelableProvider";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/utils/getCombinedFieldValidityData.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Combines the field's client-side, stateful validity data with the external invalid state to
 * determine the field's true validity.
 */ __turbopack_context__.s([
    "getCombinedFieldValidityData",
    ()=>getCombinedFieldValidityData
]);
function getCombinedFieldValidityData(validityData, invalid) {
    return {
        ...validityData,
        state: {
            ...validityData.state,
            valid: !invalid && validityData.state.valid
        }
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/root/useFieldValidation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFieldValidation",
    ()=>useFieldValidation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useTimeout.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useRefWithInit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useRefWithInit.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/merge-props/mergeProps.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/utils/getCombinedFieldValidityData.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
const validityKeys = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"]);
function isOnlyValueMissing(state) {
    if (!state || state.valid || !state.valueMissing) {
        return false;
    }
    let onlyValueMissing = false;
    for (const key of validityKeys){
        if (key === 'valid') {
            continue;
        }
        if (key === 'valueMissing') {
            onlyValueMissing = state[key];
        } else if (state[key]) {
            onlyValueMissing = false;
        }
    }
    return onlyValueMissing;
}
/**
 * Picks the input whose native validity should represent a field that owns several inputs (such as a
 * checkbox group). Prefers the first enabled currently-invalid input, where "first" follows Set
 * insertion order (mount order), and otherwise returns the first enabled input. Disabled inputs are
 * skipped because they don't participate in native constraint validation.
 */ function findRepresentativeInput(inputs) {
    let fallback = null;
    for (const input of inputs){
        if (input.disabled) {
            continue;
        }
        if (!input.validity.valid) {
            return input;
        }
        fallback ??= input;
    }
    return fallback;
}
function clearCustomValidity(element, inputs) {
    let didClearElement = false;
    for (const input of inputs){
        input.setCustomValidity('');
        didClearElement ||= input === element;
    }
    if (!didClearElement) {
        element.setCustomValidity('');
    }
}
function useFieldValidation(params) {
    const { formRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { setValidityData, validate, validityData, validationDebounceTime, invalid, markedDirtyRef, state, shouldValidateOnChange, getRegisteredFieldId } = params;
    const { controlId, getDescriptionProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useTimeout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimeout"])();
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const registeredInputs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useRefWithInit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "useFieldValidation.useRefWithInit": ()=>new Set()
    }["useFieldValidation.useRefWithInit"]).current;
    const validationCommitIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    // Checkbox groups register several inputs against a single field. Track them so a `required`
    // checkbox can't be satisfied by another input in the group, matching native per-checkbox behavior.
    const registerInput = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFieldValidation.useCallback[registerInput]": (element)=>{
            if (!element) {
                return undefined;
            }
            registeredInputs.add(element);
            return ({
                "useFieldValidation.useCallback[registerInput]": ()=>{
                    registeredInputs.delete(element);
                }
            })["useFieldValidation.useCallback[registerInput]"];
        }
    }["useFieldValidation.useCallback[registerInput]"], [
        registeredInputs
    ]);
    const commit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFieldValidation.useStableCallback[commit]": async (value, revalidate = false)=>{
            // A field can own several inputs (a checkbox group), but only the last-mounted one wins the shared
            // `inputRef`. Validate against the registry instead so every input counts; `inputRef` is the
            // fallback only when no registered input applies (none registered, or all of them disabled).
            const element = findRepresentativeInput(registeredInputs) ?? inputRef.current;
            if (!element) {
                return;
            }
            validationCommitIdRef.current += 1;
            const validationCommitId = validationCommitIdRef.current;
            function updateRegisteredFieldValidity(nextValidityData, externalInvalid = invalid) {
                const fieldId = getRegisteredFieldId() ?? controlId;
                if (fieldId == null) {
                    return;
                }
                const currentFieldData = formRef.current.fields.get(fieldId);
                if (!currentFieldData) {
                    return;
                }
                const validityDataWithFormErrors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(nextValidityData, externalInvalid);
                formRef.current.fields.set(fieldId, {
                    ...currentFieldData,
                    validityData: validityDataWithFormErrors
                });
            }
            if (revalidate) {
                if (state.valid !== false) {
                    return;
                }
                const currentNativeValidity = element.validity;
                if (!currentNativeValidity.valueMissing) {
                    // The 'valueMissing' (required) condition has been resolved by the user typing.
                    // Temporarily mark the field as valid for this onChange event.
                    // Other native errors (e.g., typeMismatch) will be caught by full validation on blur or submit.
                    const nextValidityData = {
                        value,
                        state: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
                            valid: true
                        },
                        error: '',
                        errors: [],
                        initialValue: validityData.initialValue
                    };
                    clearCustomValidity(element, registeredInputs);
                    // The required value is now present; ignore stale external invalid state for this pass.
                    updateRegisteredFieldValidity(nextValidityData, false);
                    setValidityData(nextValidityData);
                    return;
                }
                // Value is still missing, or other conditions apply.
                // Let's use a representation of current validity for isOnlyValueMissing.
                const currentNativeValidityObject = validityKeys.reduce({
                    "useFieldValidation.useStableCallback[commit].currentNativeValidityObject": (acc, key)=>{
                        acc[key] = currentNativeValidity[key];
                        return acc;
                    }
                }["useFieldValidation.useStableCallback[commit].currentNativeValidityObject"], {});
                // If it's (still) natively invalid due to something other than just valueMissing,
                // then bail from this revalidation on change to avoid "scolding" for other errors.
                if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) {
                    return;
                }
            // If valueMissing is still true AND it's the only issue, or if the field is now natively valid,
            // let it fall through to the main validation logic below.
            }
            function getState(el) {
                const computedState = validityKeys.reduce({
                    "useFieldValidation.useStableCallback[commit].getState.computedState": (acc, key)=>{
                        acc[key] = el.validity[key];
                        return acc;
                    }
                }["useFieldValidation.useStableCallback[commit].getState.computedState"], {});
                let hasOnlyValueMissingError = false;
                for (const key of validityKeys){
                    if (key === 'valid') {
                        continue;
                    }
                    if (key === 'valueMissing' && computedState[key]) {
                        hasOnlyValueMissingError = true;
                    } else if (computedState[key]) {
                        return computedState;
                    }
                }
                // Only make `valueMissing` mark the field invalid if it's been changed
                // to reduce error noise.
                if (hasOnlyValueMissingError && !markedDirtyRef.current) {
                    computedState.valid = true;
                    computedState.valueMissing = false;
                }
                return computedState;
            }
            timeout.clear();
            let result = null;
            let validationErrors = [];
            const nextState = getState(element);
            let defaultValidationMessage;
            const isValidatingOnChange = shouldValidateOnChange();
            if (element.validationMessage && !isValidatingOnChange) {
                // not validating on change, if there is a `validationMessage` from
                // native validity, set errors and skip calling the custom validate fn
                defaultValidationMessage = element.validationMessage;
                validationErrors = [
                    element.validationMessage
                ];
            } else {
                // call the validate function because either
                // - validating on change, or
                // - native constraint validations passed, custom validity check is next
                const formValues = Array.from(formRef.current.fields.values()).reduce({
                    "useFieldValidation.useStableCallback[commit].formValues": (acc, field)=>{
                        if (field.name) {
                            acc[field.name] = field.getValue();
                        }
                        return acc;
                    }
                }["useFieldValidation.useStableCallback[commit].formValues"], {});
                const resultOrPromise = validate(value, formValues);
                if (typeof resultOrPromise === 'object' && resultOrPromise !== null && 'then' in resultOrPromise) {
                    result = await resultOrPromise;
                    if (validationCommitId !== validationCommitIdRef.current) {
                        return;
                    }
                } else {
                    result = resultOrPromise;
                }
                if (result !== null) {
                    nextState.valid = false;
                    nextState.customError = true;
                    if (Array.isArray(result)) {
                        validationErrors = result;
                        element.setCustomValidity(result.join('\n'));
                    } else if (result) {
                        validationErrors = [
                            result
                        ];
                        element.setCustomValidity(result);
                    }
                } else if (isValidatingOnChange) {
                    // validate function returned no errors, if validating on change
                    // we need to clear the custom validity state
                    clearCustomValidity(element, registeredInputs);
                    nextState.customError = false;
                    if (element.validationMessage) {
                        defaultValidationMessage = element.validationMessage;
                        validationErrors = [
                            element.validationMessage
                        ];
                    } else if (element.validity.valid && !nextState.valid) {
                        nextState.valid = true;
                    }
                }
            }
            const nextValidityData = {
                value,
                state: nextState,
                error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ''),
                errors: validationErrors,
                initialValue: validityData.initialValue
            };
            // Keep Form-level errors part of overall field validity for submit blocking/focus logic.
            updateRegisteredFieldValidity(nextValidityData);
            setValidityData(nextValidityData);
        }
    }["useFieldValidation.useStableCallback[commit]"]);
    const change = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFieldValidation.useStableCallback[change]": (value)=>{
            timeout.clear();
            const validateOnChange = shouldValidateOnChange();
            if (validateOnChange && value !== '' && validationDebounceTime) {
                validationCommitIdRef.current += 1;
                timeout.start(validationDebounceTime, {
                    "useFieldValidation.useStableCallback[change]": ()=>{
                        commit(value);
                    }
                }["useFieldValidation.useStableCallback[change]"]);
            } else {
                commit(value, !validateOnChange);
            }
        }
    }["useFieldValidation.useStableCallback[change]"]);
    const getValidationProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useFieldValidation.useCallback[getValidationProps]": (disabled, externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$merge$2d$props$2f$mergeProps$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(getDescriptionProps(externalProps), state.valid === false && !state.disabled && !disabled ? {
                'aria-invalid': true
            } : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"])
    }["useFieldValidation.useCallback[getValidationProps]"], [
        getDescriptionProps,
        state.disabled,
        state.valid
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFieldValidation.useMemo": ()=>({
                getValidationProps,
                inputRef,
                registerInput,
                commit,
                change
            })
    }["useFieldValidation.useMemo"], [
        getValidationProps,
        registerInput,
        commit,
        change
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-register-control/useFieldControlRegistration.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFieldControlRegistration",
    ()=>useFieldControlRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/utils/getCombinedFieldValidityData.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function useFieldControlRegistration(params) {
    const { commit, invalid, markedDirtyRef, name, setRegisteredFieldName, setRegisteredFieldId, setValidityData, validityData } = params;
    const { formRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const activeFieldControlSourceRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const registrationRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const fallbackControlRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const getValueForForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFieldControlRegistration.useStableCallback[getValueForForm]": ()=>{
            const registration = registrationRef.current;
            if (!registration) {
                return undefined;
            }
            if (registration.getValue) {
                return registration.getValue();
            }
            return registration.value;
        }
    }["useFieldControlRegistration.useStableCallback[getValueForForm]"]);
    function getRegistrationValue(registration) {
        return registration.value === undefined ? getValueForForm() : registration.value;
    }
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFieldControlRegistration.useStableCallback[validate]": ()=>{
            const registration = registrationRef.current;
            markedDirtyRef.current = true;
            if (!registration) {
                commit(validityData.value);
                return;
            }
            commit(getRegistrationValue(registration));
        }
    }["useFieldControlRegistration.useStableCallback[validate]"]);
    function refreshRegistration() {
        const registration = registrationRef.current;
        if (!registration || !registration.id) {
            return;
        }
        formRef.current.fields.set(registration.id, {
            getValue: getValueForForm,
            name: name ?? registration.name,
            controlRef: registration.controlRef ?? fallbackControlRef,
            validityData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid),
            validate
        });
    }
    function deleteRegistration(id = registrationRef.current?.id) {
        if (id) {
            formRef.current.fields.delete(id);
        }
    }
    function syncInitialValue() {
        const registration = registrationRef.current;
        if (!registration) {
            return;
        }
        const initialValue = getRegistrationValue(registration);
        if (validityData.initialValue === null && initialValue !== null) {
            setValidityData((prev)=>({
                    ...prev,
                    initialValue
                }));
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFieldControlRegistration.useIsoLayoutEffect": ()=>{
            const registration = registrationRef.current;
            if (!registration || !registration.id) {
                return;
            }
            setRegisteredFieldName(name ? undefined : registration.name);
            formRef.current.fields.set(registration.id, {
                getValue: getValueForForm,
                name: name ?? registration.name,
                controlRef: registration.controlRef ?? fallbackControlRef,
                validityData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid),
                validate
            });
        }
    }["useFieldControlRegistration.useIsoLayoutEffect"], [
        formRef,
        getValueForForm,
        invalid,
        name,
        setRegisteredFieldName,
        validate,
        validityData
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useFieldControlRegistration.useIsoLayoutEffect": ()=>{
            const fields = formRef.current.fields;
            return ({
                "useFieldControlRegistration.useIsoLayoutEffect": ()=>{
                    const id = registrationRef.current?.id;
                    if (id) {
                        fields.delete(id);
                    }
                }
            })["useFieldControlRegistration.useIsoLayoutEffect"];
        }
    }["useFieldControlRegistration.useIsoLayoutEffect"], [
        formRef
    ]);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useFieldControlRegistration.useStableCallback[register]": (source, registration)=>{
            if (!registration) {
                if (activeFieldControlSourceRef.current === source) {
                    activeFieldControlSourceRef.current = null;
                    deleteRegistration();
                    registrationRef.current = null;
                    setRegisteredFieldName(undefined);
                    setRegisteredFieldId(undefined);
                }
                return;
            }
            const previousId = registrationRef.current?.id;
            activeFieldControlSourceRef.current = source;
            registrationRef.current = registration;
            if (!name) {
                setRegisteredFieldName(registration.name);
            }
            setRegisteredFieldId(registration.id);
            if (previousId && previousId !== registration.id) {
                deleteRegistration(previousId);
            }
            syncInitialValue();
            refreshRegistration();
        }
    }["useFieldControlRegistration.useStableCallback[register]"]);
    return [
        validate,
        register
    ];
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/root/FieldRoot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldRoot",
    ()=>FieldRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$fieldset$2f$root$2f$FieldsetRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/fieldset/root/FieldsetRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$root$2f$useFieldValidation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/root/useFieldValidation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$register$2d$control$2f$useFieldControlRegistration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-register-control/useFieldControlRegistration.mjs [app-client] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const FieldRootInner = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldRootInner(componentProps, forwardedRef) {
    const { errors, validationMode: formValidationMode, submitAttemptedRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { render, className, validate: validateProp, validationDebounceTime = 0, validationMode = formValidationMode, name, disabled: disabledProp = false, invalid: invalidProp, dirty: dirtyProp, touched: touchedProp, actionsRef, style, ...elementProps } = componentProps;
    const disabledFieldset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$fieldset$2f$root$2f$FieldsetRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldsetRootContext"])(true)?.disabled;
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(validateProp || ({
        "FieldRootInner.FieldRootInner.useStableCallback[validate]": ()=>null
    })["FieldRootInner.FieldRootInner.useStableCallback[validate]"]);
    const disabled = disabledFieldset || disabledProp;
    const [touchedState, setTouchedUnwrapped] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [dirtyState, setDirtyUnwrapped] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [filled, setFilled] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [focused, setFocused] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const dirty = dirtyProp ?? dirtyState;
    const touched = touchedProp ?? touchedState;
    const markedDirtyRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](dirty);
    const registeredFieldIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const [registeredFieldName, setRegisteredFieldName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]();
    const effectiveName = name ?? registeredFieldName;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldRootInner.FieldRootInner.useIsoLayoutEffect": ()=>{
            if (dirtyProp !== undefined) {
                markedDirtyRef.current = dirtyProp;
            }
        }
    }["FieldRootInner.FieldRootInner.useIsoLayoutEffect"], [
        dirtyProp
    ]);
    const getRegisteredFieldId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "FieldRootInner.FieldRootInner.useCallback[getRegisteredFieldId]": ()=>registeredFieldIdRef.current
    }["FieldRootInner.FieldRootInner.useCallback[getRegisteredFieldId]"], []);
    const setRegisteredFieldId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "FieldRootInner.FieldRootInner.useCallback[setRegisteredFieldId]": (id)=>{
            registeredFieldIdRef.current = id;
        }
    }["FieldRootInner.FieldRootInner.useCallback[setRegisteredFieldId]"], []);
    const setDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldRootInner.FieldRootInner.useStableCallback[setDirty]": (value)=>{
            if (dirtyProp !== undefined) {
                return;
            }
            if (value) {
                markedDirtyRef.current = true;
            }
            setDirtyUnwrapped(value);
        }
    }["FieldRootInner.FieldRootInner.useStableCallback[setDirty]"]);
    const setTouched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldRootInner.FieldRootInner.useStableCallback[setTouched]": (value)=>{
            if (touchedProp !== undefined) {
                return;
            }
            setTouchedUnwrapped(value);
        }
    }["FieldRootInner.FieldRootInner.useStableCallback[setTouched]"]);
    const shouldValidateOnChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldRootInner.FieldRootInner.useStableCallback[shouldValidateOnChange]": ()=>validationMode === 'onChange' || validationMode === 'onSubmit' && submitAttemptedRef.current
    }["FieldRootInner.FieldRootInner.useStableCallback[shouldValidateOnChange]"]);
    const formError = effectiveName && Object.hasOwn(errors, effectiveName) ? errors[effectiveName] : null;
    const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
    const invalid = invalidProp === true || hasFormError;
    const [validityData, setValidityData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
        error: '',
        errors: [],
        value: null,
        initialValue: null
    });
    const valid = disabled ? null : !invalid && validityData.state.valid;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldRootInner.FieldRootInner.useMemo[state]": ()=>({
                disabled,
                touched,
                dirty,
                valid,
                filled,
                focused
            })
    }["FieldRootInner.FieldRootInner.useMemo[state]"], [
        disabled,
        touched,
        dirty,
        valid,
        filled,
        focused
    ]);
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$root$2f$useFieldValidation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldValidation"])({
        setValidityData,
        validate,
        validityData,
        validationDebounceTime,
        invalid,
        markedDirtyRef,
        state,
        shouldValidateOnChange,
        getRegisteredFieldId
    });
    const [validateFieldControl, registerFieldControl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$register$2d$control$2f$useFieldControlRegistration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldControlRegistration"])({
        commit: validation.commit,
        invalid,
        markedDirtyRef,
        name,
        setRegisteredFieldName,
        setRegisteredFieldId,
        setValidityData,
        validityData
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"](actionsRef, {
        "FieldRootInner.FieldRootInner.useImperativeHandle": ()=>({
                validate: validateFieldControl
            })
    }["FieldRootInner.FieldRootInner.useImperativeHandle"], [
        validateFieldControl
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldRootInner.FieldRootInner.useMemo[contextValue]": ()=>({
                invalid,
                name: effectiveName,
                validityData,
                setValidityData,
                disabled,
                touched,
                setTouched,
                dirty,
                setDirty,
                filled,
                setFilled,
                focused,
                setFocused,
                validate,
                validationMode,
                validationDebounceTime,
                shouldValidateOnChange,
                state,
                markedDirtyRef,
                registerFieldControl,
                validation
            })
    }["FieldRootInner.FieldRootInner.useMemo[contextValue]"], [
        invalid,
        effectiveName,
        validityData,
        disabled,
        touched,
        setTouched,
        dirty,
        setDirty,
        filled,
        setFilled,
        focused,
        setFocused,
        validate,
        validationMode,
        validationDebounceTime,
        shouldValidateOnChange,
        state,
        registerFieldControl,
        validation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldRootContext"].Provider, {
        value: contextValue,
        children: element
    });
});
/**
 * Groups all parts of the field.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ if ("TURBOPACK compile-time truthy", 1) FieldRootInner.displayName = "FieldRootInner";
const FieldRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldRoot(componentProps, forwardedRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelableProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(FieldRootInner, {
            ...componentProps,
            ref: forwardedRef
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) FieldRoot.displayName = "FieldRoot";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/shadowDom.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeElement",
    ()=>activeElement,
    "contains",
    ()=>contains,
    "getTarget",
    ()=>getTarget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
function activeElement(doc) {
    let element = doc.activeElement;
    while(element?.shadowRoot?.activeElement != null){
        element = element.shadowRoot.activeElement;
    }
    return element;
}
function contains(parent, child) {
    if (!parent || !child) {
        return false;
    }
    const rootNode = child.getRootNode?.();
    // First, attempt with the faster native method.
    if (parent.contains(child)) {
        return true;
    }
    // Then fall back to traversing out of shadow roots when needed.
    if (rootNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShadowRoot"])(rootNode)) {
        let next = child;
        while(next){
            if (parent === next) {
                return true;
            }
            next = next.parentNode || next.host;
        }
    }
    return false;
}
function getTarget(event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }
    // TS assumes `composedPath()` always exists, but older browsers without
    // shadow DOM support still fall back to `target`.
    return event.target;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/useRegisteredLabelId.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRegisteredLabelId",
    ()=>useRegisteredLabelId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
'use client';
;
;
function useRegisteredLabelId(idProp, setLabelId) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useRegisteredLabelId.useIsoLayoutEffect": ()=>{
            setLabelId(id);
            return ({
                "useRegisteredLabelId.useIsoLayoutEffect": ()=>{
                    setLabelId(undefined);
                }
            })["useRegisteredLabelId.useIsoLayoutEffect"];
        }
    }["useRegisteredLabelId.useIsoLayoutEffect"], [
        id,
        setLabelId
    ]);
    return id;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/useLabel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "focusElementWithVisible",
    ()=>focusElementWithVisible,
    "useLabel",
    ()=>useLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/owner.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/shadowDom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useRegisteredLabelId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/useRegisteredLabelId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function useLabel(params = {}) {
    const { id: idProp, fallbackControlId, native = false, setLabelId: setLabelIdProp, focusControl: focusControlProp } = params;
    const { controlId: contextControlId, setLabelId: setContextLabelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const syncLabelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useLabel.useStableCallback[syncLabelId]": (nextLabelId)=>{
            setContextLabelId(nextLabelId);
            setLabelIdProp?.(nextLabelId);
        }
    }["useLabel.useStableCallback[syncLabelId]"]);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$useRegisteredLabelId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRegisteredLabelId"])(idProp, syncLabelId);
    const resolvedControlId = contextControlId ?? fallbackControlId;
    function focusControl(event) {
        if (focusControlProp) {
            focusControlProp(event, resolvedControlId);
            return;
        }
        if (!resolvedControlId) {
            return;
        }
        const controlElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget).getElementById(resolvedControlId);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(controlElement)) {
            focusElementWithVisible(controlElement);
        }
    }
    function handleInteraction(event) {
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
        if (target?.closest('button,input,select,textarea')) {
            return;
        }
        // Prevent text selection when double clicking label.
        if (!event.defaultPrevented && event.detail > 1) {
            event.preventDefault();
        }
        if (native) {
            return;
        }
        focusControl(event);
    }
    return native ? {
        id,
        htmlFor: resolvedControlId ?? undefined,
        onMouseDown: handleInteraction
    } : {
        id,
        onClick: handleInteraction,
        onPointerDown (event) {
            event.preventDefault();
        }
    };
}
function focusElementWithVisible(element) {
    element.focus({
        // Available from Chrome 144+ (January 2026).
        // Safari and Firefox already support it.
        focusVisible: true
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/item/FieldItemContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldItemContext",
    ()=>FieldItemContext,
    "useFieldItemContext",
    ()=>useFieldItemContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const FieldItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    disabled: false
});
if ("TURBOPACK compile-time truthy", 1) FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FieldItemContext);
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/label/FieldLabel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldLabel",
    ()=>FieldLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/error.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/safeReact.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/useLabel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItemContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/item/FieldItemContext.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const FieldLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldLabel(componentProps, forwardedRef) {
    const { render, className, style, id: idProp, nativeLabel = true, ...elementProps } = componentProps;
    const fieldRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const fieldItemContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItemContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldItemContext"])();
    const { labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const state = {
        ...fieldRootContext.state,
        disabled: fieldRootContext.disabled || fieldItemContext.disabled
    };
    const labelRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const labelProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabel"])({
        id: labelId ?? idProp,
        native: nativeLabel
    });
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
            "FieldLabel.FieldLabel.useEffect": ()=>{
                if (!labelRef.current) {
                    return;
                }
                const isLabelTag = labelRef.current.tagName === 'LABEL';
                if (nativeLabel) {
                    if (!isLabelTag) {
                        const ownerStackMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeReact"].captureOwnerStack?.() || '';
                        const message = '<Field.Label> expected a <label> element because the `nativeLabel` prop is true. ' + 'Rendering a non-<label> disables native label association, so `htmlFor` will not ' + 'work. Use a real <label> in the `render` prop, or set `nativeLabel` to `false`.';
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${message}${ownerStackMessage}`);
                    }
                } else if (isLabelTag) {
                    const ownerStackMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$safeReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeReact"].captureOwnerStack?.() || '';
                    const message = '<Field.Label> expected a non-<label> element because the `nativeLabel` prop is false. ' + 'Rendering a <label> assumes native label behavior while Base UI treats it as ' + 'non-native, which can cause unexpected pointer behavior. Use a non-<label> in the ' + '`render` prop, or set `nativeLabel` to `true`.';
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$error$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])(`${message}${ownerStackMessage}`);
                }
            }
        }["FieldLabel.FieldLabel.useEffect"], [
            nativeLabel
        ]);
    }
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('label', componentProps, {
        ref: [
            forwardedRef,
            labelRef
        ],
        state,
        props: [
            labelProps,
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldLabel.displayName = "FieldLabel";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/resolveRef.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided argument is a ref object, returns its `current` value.
 * Otherwise, returns the argument itself.
 */ __turbopack_context__.s([
    "resolveRef",
    ()=>resolveRef
]);
function resolveRef(maybeRef) {
    if (maybeRef == null) {
        return maybeRef;
    }
    return 'current' in maybeRef ? maybeRef.current : maybeRef;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransitionStatusDataAttributes",
    ()=>TransitionStatusDataAttributes,
    "transitionStatusMapping",
    ()=>transitionStatusMapping
]);
let TransitionStatusDataAttributes = /*#__PURE__*/ function(TransitionStatusDataAttributes) {
    /**
   * Present when the component is animating in.
   */ TransitionStatusDataAttributes["startingStyle"] = "data-starting-style";
    /**
   * Present when the component is animating out.
   */ TransitionStatusDataAttributes["endingStyle"] = "data-ending-style";
    return TransitionStatusDataAttributes;
}({});
const STARTING_HOOK = {
    [TransitionStatusDataAttributes.startingStyle]: ''
};
const ENDING_HOOK = {
    [TransitionStatusDataAttributes.endingStyle]: ''
};
const transitionStatusMapping = {
    transitionStatus (value) {
        if (value === 'starting') {
            return STARTING_HOOK;
        }
        if (value === 'ending') {
            return ENDING_HOOK;
        }
        return null;
    }
};
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useAnimationsFinished.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimationsFinished",
    ()=>useAnimationsFinished
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useAnimationFrame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/utils/resolveRef.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useAnimationsFinished.useStableCallback": (fnToExecute, /**
   * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
   * can be used to abort `fnToExecute` before all the animations have finished.
   * @default null
   */ signal = null)=>{
            frame.cancel();
            const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$utils$2f$resolveRef$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRef"])(elementOrRef);
            if (element == null) {
                return;
            }
            const resolvedElement = element;
            const done = {
                "useAnimationsFinished.useStableCallback.done": ()=>{
                    // Synchronously flush the unmounting of the component so that the browser doesn't
                    // paint: https://github.com/mui/base-ui/issues/979
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"](fnToExecute);
                }
            }["useAnimationsFinished.useStableCallback.done"];
            if (typeof resolvedElement.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
                fnToExecute();
                return;
            }
            function exec() {
                Promise.all(resolvedElement.getAnimations().map({
                    "useAnimationsFinished.useStableCallback.exec": (animation)=>animation.finished
                }["useAnimationsFinished.useStableCallback.exec"])).then({
                    "useAnimationsFinished.useStableCallback.exec": ()=>{
                        if (!signal?.aborted) {
                            done();
                        }
                    }
                }["useAnimationsFinished.useStableCallback.exec"]).catch({
                    "useAnimationsFinished.useStableCallback.exec": ()=>{
                        if (treatAbortedAsFinished) {
                            if (!signal?.aborted) {
                                done();
                            }
                            return;
                        }
                        const currentAnimations = resolvedElement.getAnimations();
                        if (!signal?.aborted && currentAnimations.length > 0 && currentAnimations.some({
                            "useAnimationsFinished.useStableCallback.exec": (animation)=>animation.pending || animation.playState !== 'finished'
                        }["useAnimationsFinished.useStableCallback.exec"])) {
                            // Sometimes animations can be aborted because a property they depend on changes while the animation plays.
                            // In such cases, we need to re-check if any new animations have started.
                            exec();
                        }
                    }
                }["useAnimationsFinished.useStableCallback.exec"]);
            }
            if (waitForStartingStyleRemoved) {
                const startingStyleAttribute = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].startingStyle;
                // If `[data-starting-style]` isn't present, fall back to waiting one more frame
                // to give "open" animations a chance to be registered.
                if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
                    frame.request(exec);
                    return;
                }
                // Wait for `[data-starting-style]` to have been removed.
                const attributeObserver = new MutationObserver({
                    "useAnimationsFinished.useStableCallback": ()=>{
                        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
                            attributeObserver.disconnect();
                            exec();
                        }
                    }
                }["useAnimationsFinished.useStableCallback"]);
                attributeObserver.observe(resolvedElement, {
                    attributes: true,
                    attributeFilter: [
                        startingStyleAttribute
                    ]
                });
                signal?.addEventListener('abort', {
                    "useAnimationsFinished.useStableCallback": ()=>attributeObserver.disconnect()
                }["useAnimationsFinished.useStableCallback"], {
                    once: true
                });
                return;
            }
            frame.request(exec);
        }
    }["useAnimationsFinished.useStableCallback"]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenChangeComplete",
    ()=>useOpenChangeComplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useAnimationsFinished$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useAnimationsFinished.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function useOpenChangeComplete(parameters) {
    const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters;
    const onComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(onCompleteParam);
    const runOnceAnimationsFinish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useAnimationsFinished$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationsFinished"])(ref, open, false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useOpenChangeComplete.useEffect": ()=>{
            if (!enabled) {
                return undefined;
            }
            const abortController = new AbortController();
            runOnceAnimationsFinish(onComplete, abortController.signal);
            return ({
                "useOpenChangeComplete.useEffect": ()=>{
                    abortController.abort();
                }
            })["useOpenChangeComplete.useEffect"];
        }
    }["useOpenChangeComplete.useEffect"], [
        enabled,
        open,
        onComplete,
        runOnceAnimationsFinish
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useTransitionStatus.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTransitionStatus",
    ()=>useTransitionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useAnimationFrame.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
    const [transitionStatus, setTransitionStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](open && enableIdleState ? 'idle' : undefined);
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](open);
    if (open && !mounted) {
        setMounted(true);
        setTransitionStatus('starting');
    }
    if (!open && mounted && transitionStatus !== 'ending' && !deferEndingState) {
        setTransitionStatus('ending');
    }
    if (!open && !mounted && transitionStatus === 'ending') {
        setTransitionStatus(undefined);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTransitionStatus.useIsoLayoutEffect": ()=>{
            if (!open && mounted && transitionStatus !== 'ending' && deferEndingState) {
                const frame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].request({
                    "useTransitionStatus.useIsoLayoutEffect.frame": ()=>{
                        setTransitionStatus('ending');
                    }
                }["useTransitionStatus.useIsoLayoutEffect.frame"]);
                return ({
                    "useTransitionStatus.useIsoLayoutEffect": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
                    }
                })["useTransitionStatus.useIsoLayoutEffect"];
            }
            return undefined;
        }
    }["useTransitionStatus.useIsoLayoutEffect"], [
        open,
        mounted,
        transitionStatus,
        deferEndingState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTransitionStatus.useIsoLayoutEffect": ()=>{
            if (!open || enableIdleState) {
                return undefined;
            }
            const frame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].request({
                "useTransitionStatus.useIsoLayoutEffect.frame": ()=>{
                    // Avoid `flushSync` here due to Firefox.
                    // See https://github.com/mui/base-ui/pull/3424
                    setTransitionStatus(undefined);
                }
            }["useTransitionStatus.useIsoLayoutEffect.frame"]);
            return ({
                "useTransitionStatus.useIsoLayoutEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
                }
            })["useTransitionStatus.useIsoLayoutEffect"];
        }
    }["useTransitionStatus.useIsoLayoutEffect"], [
        enableIdleState,
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useTransitionStatus.useIsoLayoutEffect": ()=>{
            if (!open || !enableIdleState) {
                return undefined;
            }
            if (open && mounted && transitionStatus !== 'idle') {
                setTransitionStatus('starting');
            }
            const frame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].request({
                "useTransitionStatus.useIsoLayoutEffect.frame": ()=>{
                    setTransitionStatus('idle');
                }
            }["useTransitionStatus.useIsoLayoutEffect.frame"]);
            return ({
                "useTransitionStatus.useIsoLayoutEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useAnimationFrame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
                }
            })["useTransitionStatus.useIsoLayoutEffect"];
        }
    }["useTransitionStatus.useIsoLayoutEffect"], [
        enableIdleState,
        open,
        mounted,
        transitionStatus
    ]);
    return {
        mounted,
        setMounted,
        transitionStatus
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/error/FieldError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldError",
    ()=>FieldError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useOpenChangeComplete$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useTransitionStatus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useTransitionStatus.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$stateAttributesMapping$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const FieldError = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldError(componentProps, forwardedRef) {
    const { render, id: idProp, className, match, style, ...elementProps } = componentProps;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const { validityData, state: fieldState, name } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const { setMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const { errors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const formError = name && Object.hasOwn(errors, name) ? errors[name] : null;
    const hasFormError = !!(Array.isArray(formError) ? formError.length : formError);
    const hasSpecificMatch = typeof match === 'string';
    let rendered = false;
    if (match === true) {
        rendered = true;
    } else if (fieldState.disabled) {
        rendered = false;
    } else if (hasSpecificMatch) {
        rendered = Boolean(validityData.state[match]);
    } else {
        rendered = hasFormError || validityData.state.valid === false;
    }
    const { mounted, transitionStatus, setMounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useTransitionStatus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransitionStatus"])(rendered);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldError.FieldError.useIsoLayoutEffect": ()=>{
            if (!rendered || !id) {
                return undefined;
            }
            setMessageIds({
                "FieldError.FieldError.useIsoLayoutEffect": (v)=>v.concat(id)
            }["FieldError.FieldError.useIsoLayoutEffect"]);
            return ({
                "FieldError.FieldError.useIsoLayoutEffect": ()=>{
                    setMessageIds({
                        "FieldError.FieldError.useIsoLayoutEffect": (v)=>v.filter({
                                "FieldError.FieldError.useIsoLayoutEffect": (item)=>item !== id
                            }["FieldError.FieldError.useIsoLayoutEffect"])
                    }["FieldError.FieldError.useIsoLayoutEffect"]);
                }
            })["FieldError.FieldError.useIsoLayoutEffect"];
        }
    }["FieldError.FieldError.useIsoLayoutEffect"], [
        rendered,
        id,
        setMessageIds
    ]);
    const errorRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const [lastRenderedMessage, setLastRenderedMessage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [lastRenderedMessageKey, setLastRenderedMessageKey] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    let error = validityData.error;
    if (!hasSpecificMatch && hasFormError) {
        error = formError;
    } else if (validityData.errors.length > 1) {
        error = validityData.errors;
    }
    let errorMessage = error ?? '';
    if (Array.isArray(error)) {
        errorMessage = error.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ul", {
            children: error.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("li", {
                    children: message
                }, message))
        }) : error[0] ?? '';
    }
    const errorKey = Array.isArray(error) ? JSON.stringify(error) : error;
    if (rendered && errorKey !== lastRenderedMessageKey) {
        setLastRenderedMessageKey(errorKey);
        setLastRenderedMessage(errorMessage);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useOpenChangeComplete$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open: rendered,
        ref: errorRef,
        onComplete () {
            if (!rendered) {
                setMounted(false);
            }
        }
    });
    const state = {
        ...fieldState,
        transitionStatus
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: [
            forwardedRef,
            errorRef
        ],
        state,
        props: [
            {
                id,
                children: rendered ? errorMessage : lastRenderedMessage
            },
            elementProps
        ],
        stateAttributesMapping,
        enabled: mounted
    });
    if (!mounted) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldError.displayName = "FieldError";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/description/FieldDescription.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldDescription",
    ()=>FieldDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItemContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/item/FieldItemContext.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const FieldDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldDescription(componentProps, forwardedRef) {
    const { render, id: idProp, className, style, ...elementProps } = componentProps;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const fieldRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const fieldItemContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItemContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldItemContext"])();
    const { setMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const state = {
        ...fieldRootContext.state,
        disabled: fieldRootContext.disabled || fieldItemContext.disabled
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldDescription.FieldDescription.useIsoLayoutEffect": ()=>{
            if (!id) {
                return undefined;
            }
            setMessageIds({
                "FieldDescription.FieldDescription.useIsoLayoutEffect": (v)=>v.concat(id)
            }["FieldDescription.FieldDescription.useIsoLayoutEffect"]);
            return ({
                "FieldDescription.FieldDescription.useIsoLayoutEffect": ()=>{
                    setMessageIds({
                        "FieldDescription.FieldDescription.useIsoLayoutEffect": (v)=>v.filter({
                                "FieldDescription.FieldDescription.useIsoLayoutEffect": (item)=>item !== id
                            }["FieldDescription.FieldDescription.useIsoLayoutEffect"])
                    }["FieldDescription.FieldDescription.useIsoLayoutEffect"]);
                }
            })["FieldDescription.FieldDescription.useIsoLayoutEffect"];
        }
    }["FieldDescription.FieldDescription.useIsoLayoutEffect"], [
        id,
        setMessageIds
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldDescription.displayName = "FieldDescription";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRegisterFieldControl",
    ()=>useRegisterFieldControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
    const { registerFieldControl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const sourceRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    if (!sourceRef.current) {
        sourceRef.current = Symbol();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useRegisterFieldControl.useIsoLayoutEffect": ()=>{
            const source = sourceRef.current;
            if (!source || !enabled) {
                return undefined;
            }
            const registration = {
                controlRef,
                getValue: getFormValueOverride,
                id,
                name,
                value
            };
            registerFieldControl(source, registration);
            return ({
                "useRegisterFieldControl.useIsoLayoutEffect": ()=>{
                    registerFieldControl(source, undefined);
                }
            })["useRegisterFieldControl.useIsoLayoutEffect"];
        }
    }["useRegisterFieldControl.useIsoLayoutEffect"], [
        controlRef,
        enabled,
        getFormValueOverride,
        id,
        name,
        registerFieldControl,
        value
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLabelableId",
    ()=>useLabelableId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useRefWithInit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useRefWithInit.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useBaseUiId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function useLabelableId(params = {}) {
    const { id, implicit = false, controlRef } = params;
    const { controlId, registerControlId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const defaultId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useBaseUiId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(id);
    const controlIdForEffect = implicit ? controlId : undefined;
    const controlSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useRefWithInit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])({
        "useLabelableId.useRefWithInit[controlSourceRef]": ()=>Symbol('labelable-control')
    }["useLabelableId.useRefWithInit[controlSourceRef]"]);
    const hasRegisteredRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const hadExplicitIdRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](id != null);
    const unregisterControlId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useLabelableId.useStableCallback[unregisterControlId]": ()=>{
            if (!hasRegisteredRef.current || registerControlId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"]) {
                return;
            }
            hasRegisteredRef.current = false;
            registerControlId(controlSourceRef.current, undefined);
        }
    }["useLabelableId.useStableCallback[unregisterControlId]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useLabelableId.useIsoLayoutEffect": ()=>{
            if (registerControlId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NOOP"]) {
                return undefined;
            }
            let nextId;
            if (implicit) {
                const elem = controlRef?.current;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$11$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(elem) && elem.closest('label') != null) {
                    nextId = id ?? null;
                } else {
                    nextId = controlIdForEffect ?? defaultId;
                }
            } else if (id != null) {
                hadExplicitIdRef.current = true;
                nextId = id;
            } else if (hadExplicitIdRef.current) {
                nextId = defaultId;
            } else {
                unregisterControlId();
                return undefined;
            }
            if (nextId === undefined) {
                unregisterControlId();
                return undefined;
            }
            hasRegisteredRef.current = true;
            registerControlId(controlSourceRef.current, nextId);
            return undefined;
        }
    }["useLabelableId.useIsoLayoutEffect"], [
        id,
        controlRef,
        controlIdForEffect,
        registerControlId,
        implicit,
        defaultId,
        controlSourceRef,
        unregisterControlId
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useLabelableId.useEffect": ()=>{
            return unregisterControlId;
        }
    }["useLabelableId.useEffect"], [
        unregisterControlId
    ]);
    return controlId ?? defaultId;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChangeEventDetails",
    ()=>createChangeEventDetails,
    "createGenericEventDetails",
    ()=>createGenericEventDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/empty.mjs [app-client] (ecmascript)");
;
;
function createChangeEventDetails(reason, event, trigger, customProperties) {
    let canceled = false;
    let allowPropagation = false;
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const details = {
        reason,
        event: event ?? new Event('base-ui'),
        cancel () {
            canceled = true;
        },
        allowPropagation () {
            allowPropagation = true;
        },
        get isCanceled () {
            return canceled;
        },
        get isPropagationAllowed () {
            return allowPropagation;
        },
        trigger,
        ...custom
    };
    return details;
}
function createGenericEventDetails(reason, event, customProperties) {
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$empty$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const details = {
        reason,
        event: event ?? new Event('base-ui'),
        ...custom
    };
    return details;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelOpen",
    ()=>cancelOpen,
    "chipRemovePress",
    ()=>chipRemovePress,
    "clearPress",
    ()=>clearPress,
    "closePress",
    ()=>closePress,
    "closeWatcher",
    ()=>closeWatcher,
    "decrementPress",
    ()=>decrementPress,
    "disabled",
    ()=>disabled,
    "drag",
    ()=>drag,
    "escapeKey",
    ()=>escapeKey,
    "focusOut",
    ()=>focusOut,
    "imperativeAction",
    ()=>imperativeAction,
    "incrementPress",
    ()=>incrementPress,
    "initial",
    ()=>initial,
    "inputBlur",
    ()=>inputBlur,
    "inputChange",
    ()=>inputChange,
    "inputClear",
    ()=>inputClear,
    "inputPaste",
    ()=>inputPaste,
    "inputPress",
    ()=>inputPress,
    "itemPress",
    ()=>itemPress,
    "keyboard",
    ()=>keyboard,
    "linkPress",
    ()=>linkPress,
    "listNavigation",
    ()=>listNavigation,
    "missing",
    ()=>missing,
    "none",
    ()=>none,
    "outsidePress",
    ()=>outsidePress,
    "pointer",
    ()=>pointer,
    "scrub",
    ()=>scrub,
    "siblingOpen",
    ()=>siblingOpen,
    "swipe",
    ()=>swipe,
    "trackPress",
    ()=>trackPress,
    "triggerFocus",
    ()=>triggerFocus,
    "triggerHover",
    ()=>triggerHover,
    "triggerPress",
    ()=>triggerPress,
    "wheel",
    ()=>wheel,
    "windowResize",
    ()=>windowResize
]);
const none = 'none';
const triggerPress = 'trigger-press';
const triggerHover = 'trigger-hover';
const triggerFocus = 'trigger-focus';
const outsidePress = 'outside-press';
const itemPress = 'item-press';
const closePress = 'close-press';
const linkPress = 'link-press';
const clearPress = 'clear-press';
const chipRemovePress = 'chip-remove-press';
const trackPress = 'track-press';
const incrementPress = 'increment-press';
const decrementPress = 'decrement-press';
const inputChange = 'input-change';
const inputClear = 'input-clear';
const inputBlur = 'input-blur';
const inputPaste = 'input-paste';
const inputPress = 'input-press';
const focusOut = 'focus-out';
const escapeKey = 'escape-key';
const closeWatcher = 'close-watcher';
const listNavigation = 'list-navigation';
const keyboard = 'keyboard';
const pointer = 'pointer';
const drag = 'drag';
const wheel = 'wheel';
const scrub = 'scrub';
const cancelOpen = 'cancel-open';
const siblingOpen = 'sibling-open';
const disabled = 'disabled';
const missing = 'missing';
const initial = 'initial';
const imperativeAction = 'imperative-action';
const swipe = 'swipe';
const windowResize = 'window-resize';
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REASONS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/control/FieldControl.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldControl",
    ()=>FieldControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useControlled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useControlled.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/owner.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+utils@0.3.1_@types_679da2919ff815a5fad5f086c5312f76/node_modules/@base-ui/utils/useStableCallback.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$register$2d$control$2f$useRegisterFieldControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/form-context/FormContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useLabelableId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/reason-parts.mjs [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/shadowDom.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const FieldControl = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldControl(componentProps, forwardedRef) {
    const { render, className, id: idProp, name: nameProp, value: valueProp, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
    const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFocused, setFilled, validationMode, validation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$form$2d$context$2f$FormContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const state = {
        ...fieldState,
        disabled
    };
    const { labelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$useLabelableId$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLabelableId"])({
        id: idProp
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldControl.FieldControl.useIsoLayoutEffect": ()=>{
            const hasExternalValue = valueProp != null;
            if (validation.inputRef.current?.value || hasExternalValue && valueProp !== '') {
                setFilled(true);
            } else if (hasExternalValue && valueProp === '') {
                setFilled(false);
            }
        }
    }["FieldControl.FieldControl.useIsoLayoutEffect"], [
        validation.inputRef,
        setFilled,
        valueProp
    ]);
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useIsoLayoutEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "FieldControl.FieldControl.useIsoLayoutEffect": ()=>{
            if (autoFocus && inputRef.current === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$shadowDom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$owner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(inputRef.current))) {
                setFocused(true);
            }
        }
    }["FieldControl.FieldControl.useIsoLayoutEffect"], [
        autoFocus,
        setFocused
    ]);
    const [valueUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useControlled$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValue,
        name: 'FieldControl',
        state: 'value'
    });
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueUnwrapped : undefined;
    const getValueFromInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$utils$40$0$2e$3$2e$1_$40$types_679da2919ff815a5fad5f086c5312f76$2f$node_modules$2f40$base$2d$ui$2f$utils$2f$useStableCallback$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "FieldControl.FieldControl.useStableCallback[getValueFromInput]": ()=>validation.inputRef.current?.value
    }["FieldControl.FieldControl.useStableCallback[getValueFromInput]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$register$2d$control$2f$useRegisterFieldControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRegisterFieldControl"])(validation.inputRef, id, value, getValueFromInput, !disabled, nameProp);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('input', componentProps, {
        ref: [
            forwardedRef,
            inputRef
        ],
        state,
        props: [
            {
                id,
                disabled,
                name,
                ref: validation.inputRef,
                'aria-labelledby': labelId,
                autoFocus,
                ...isControlled ? {
                    value
                } : {
                    defaultValue
                },
                onChange (event) {
                    const inputValue = event.currentTarget.value;
                    onValueChange?.(inputValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$createBaseUIEventDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$reason$2d$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent));
                    // `validation.change` reads `markedDirtyRef`, so update dirty before validating.
                    setDirty(inputValue !== validityData.initialValue);
                    setFilled(inputValue !== '');
                    // Workaround for https://github.com/facebook/react/issues/9023
                    if (!event.nativeEvent.defaultPrevented) {
                        clearErrors(name);
                        validation.change(inputValue);
                    }
                },
                onFocus () {
                    setFocused(true);
                },
                onBlur (event) {
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        validation.commit(event.currentTarget.value);
                    }
                },
                onKeyDown (event) {
                    if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
                        setTouched(true);
                        validation.commit(event.currentTarget.value);
                    }
                }
            },
            elementProps,
            {
                "FieldControl.FieldControl.useRenderElement[element]": (props)=>validation.getValidationProps(disabled, props)
            }["FieldControl.FieldControl.useRenderElement[element]"]
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldControl.displayName = "FieldControl";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/validity/FieldValidity.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldValidity",
    ()=>FieldValidity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/utils/getCombinedFieldValidityData.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useTransitionStatus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useTransitionStatus.mjs [app-client] (ecmascript)");
/**
 * Used to display a custom message based on the field's validity.
 * Requires `children` to be a function that accepts field validity state as an argument.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const FieldValidity = function FieldValidity(props) {
    const { children } = props;
    const { validityData, invalid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const combinedFieldValidityData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldValidity.useMemo[combinedFieldValidityData]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid)
    }["FieldValidity.useMemo[combinedFieldValidityData]"], [
        validityData,
        invalid
    ]);
    const isInvalid = combinedFieldValidityData.state.valid === false;
    const { transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useTransitionStatus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransitionStatus"])(isInvalid);
    const fieldValidityState = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldValidity.useMemo[fieldValidityState]": ()=>{
            return {
                ...combinedFieldValidityData,
                validity: combinedFieldValidityData.state,
                transitionStatus
            };
        }
    }["FieldValidity.useMemo[fieldValidityState]"], [
        combinedFieldValidityData,
        transitionStatus
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children(fieldValidityState)
    });
};
if ("TURBOPACK compile-time truthy", 1) FieldValidity.displayName = "FieldValidity";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/checkbox-group/CheckboxGroupContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckboxGroupContext",
    ()=>CheckboxGroupContext,
    "useCheckboxGroupContext",
    ()=>useCheckboxGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CheckboxGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CheckboxGroupContext.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CheckboxGroupContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/item/FieldItem.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldItem",
    ()=>FieldItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/field-constants/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/useRenderElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItemContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/item/FieldItemContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/internals/labelable-provider/LabelableProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$checkbox$2d$group$2f$CheckboxGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/checkbox-group/CheckboxGroupContext.mjs [app-client] (ecmascript)");
/**
 * Groups individual items in a checkbox group or radio group with a label and description.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const FieldItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function FieldItem(componentProps, forwardedRef) {
    const { render, className, style, disabled: disabledProp = false, ...elementProps } = componentProps;
    const { state: fieldState, disabled: rootDisabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$root$2d$context$2f$FieldRootContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const disabled = rootDisabled || disabledProp;
    const state = {
        ...fieldState,
        disabled
    };
    const checkboxGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$checkbox$2d$group$2f$CheckboxGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCheckboxGroupContext"])();
    const hasParentCheckbox = checkboxGroupContext?.allValues !== undefined;
    const controlId = hasParentCheckbox ? checkboxGroupContext?.parent.id : undefined;
    const fieldItemContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "FieldItem.FieldItem.useMemo[fieldItemContext]": ()=>({
                disabled
            })
    }["FieldItem.FieldItem.useMemo[fieldItemContext]"], [
        disabled
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$useRenderElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$field$2d$constants$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$internals$2f$labelable$2d$provider$2f$LabelableProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LabelableProvider"], {
        controlId: controlId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItemContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldItemContext"].Provider, {
            value: fieldItemContext,
            children: element
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) FieldItem.displayName = "FieldItem";
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/index.parts.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$control$2f$FieldControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldControl"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$description$2f$FieldDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldDescription"],
    "Error",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$error$2f$FieldError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"],
    "Item",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldItem"],
    "Label",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$label$2f$FieldLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$root$2f$FieldRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldRoot"],
    "Validity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$validity$2f$FieldValidity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldValidity"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/index.parts.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$root$2f$FieldRoot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/root/FieldRoot.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$label$2f$FieldLabel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/label/FieldLabel.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$error$2f$FieldError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/error/FieldError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$description$2f$FieldDescription$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/description/FieldDescription.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$control$2f$FieldControl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/control/FieldControl.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$validity$2f$FieldValidity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/validity/FieldValidity.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$item$2f$FieldItem$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/item/FieldItem.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/index.parts.mjs [app-client] (ecmascript) <export * as Field>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/index.parts.mjs [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/input/Input.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui+react@1.6.0_@types_a8ee6b6004d23c1f0d626fda351681bd/node_modules/@base-ui/react/field/index.parts.mjs [app-client] (ecmascript) <export * as Field>");
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.2.10_@babel+core@7._54fe0b4b34f39aa1bf7e10b73832e4f5/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function Input(props, forwardedRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$10_$40$babel$2b$core$40$7$2e$_54fe0b4b34f39aa1bf7e10b73832e4f5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2b$react$40$1$2e$6$2e$0_$40$types_a8ee6b6004d23c1f0d626fda351681bd$2f$node_modules$2f40$base$2d$ui$2f$react$2f$field$2f$index$2e$parts$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__["Field"].Control, {
        ref: forwardedRef,
        ...props
    });
});
if ("TURBOPACK compile-time truthy", 1) Input.displayName = "Input";
}),
]);

//# sourceMappingURL=10wj_%40base-ui_react_1tz7ja0._.js.map