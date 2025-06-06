# 데이터 스토어 (Data Stores)

이 페이지는 사용 가능한 내부 데이터 스토어들과 그들의 속성 및 메서드에 대한 참조 가이드예요! 😊 여기 나열된 모든 스토어는 [`BdApi.Webpack.getStore()`](/api/webpack#getstore)를 통해 여기서 보는 이름들로 찾을 수 있답니다.


## 유용한 코드 스니펫들 ✨

### 스토어 맵 (Store Map)

여기 나열된 모든 스토어들의 매핑을 얻고 싶다면, 이 페이지의 정보를 생성하는 데 사용된 것과 매우 유사한 코드 스니펫을 사용할 수 있어요! 정말 흥미롭지 않나요? 🤔

::: details 스니펫
```js
(() => {
    const stores = BdApi.Webpack.getModules(m => m?._dispatchToken && m?.getName);
    const mapped = {};
    for (const store of stores) {
        const storeName = store.constructor.displayName ?? store.constructor.persistKey ?? store.constructor.name ?? store.getName();
        if (storeName.length === 1) continue;
        mapped[storeName] = store;
    }
    return mapped;
})();
```
:::

이것으로 아래 나열된 모든 스토어들을 빠르게 가지고 놀면서 배울 수 있어요! 정말 재미있답니다! 🎮

### 사용 예시들 (Usage Examples)

너무 복잡하게 느껴지거나 이 모듈들이 어떻게 유용할지 확신이 서지 않는다면, 아래 스니펫의 간단한 예시들을 살펴보세요! 분명 도움이 될 거예요! 💡

::: details 스니펫

```js
const {Webpack} = BdApi;
const UserStore = Webpack.getStore("UserStore");
const ChannelStore = Webpack.getStore("ChannelStore");
const GuildStore = Webpack.getStore("GuildStore");
const GuildChannelStore = Webpack.getStore("GuildChannelStore");
const GuildMemberStore = Webpack.getStore("GuildMemberStore")


const currentUser = UserStore.getCurrentUser(); 
// -> {id: "user_id", username: "UserName", discriminator: "1234", ...}

const allGuilds = GuildStore.getGuilds(); 
// -> {guild_id_1: {name: "Guild Name 1", ...}, guild_id_2: {name: "Guild Name 2", ...}, ...}

const guildChannels = GuildChannelStore.getChannels("guild_id"); 
// -> {id: "guild_id", count: number, VOCAL: {}, SELECTABLE: {}, ...}

const channel = ChannelStore.getChannel("channel_id"); 
// -> {id: "channel_id", name: "Channel Name", type: "GUILD_TEXT", ...}

const isInGuild = GuildMemberStore.isMember("guild_id", currentUser.id); 
// -> true or false

const guildRoles = GuildStore.getRoles("guild_id"); 
// -> {role_id_1: {name: "Role Name 1", ...}, role_id_2: {name: "Role Name 2", ...}, ...}
```
:::

이 스토어들은 고급 플러그인을 만드는 데 매우 도움이 되는 정보를 쉽게 얻을 수 있게 해줘요! 정말 신기하죠? 🚀

### 문서화 (Documentation)

아래 모듈 목록은 Discord의 콘솔에서 코드 스니펫을 실행하여 생성되었어요. 모든 데이터 스토어의 매핑을 사용하여 마크다운을 생성하는 방식이랍니다! 어떻게 만들어지는지 궁금하지 않나요? 🤓

::: details 스니펫
```js
(() => {
    // 모든 스토어를 그들의 속성과 메서드에 매핑
    const stores = BdApi.Webpack.getModules(m => m?._dispatchToken && m?.getName);
    const mapped = {};
    for (const store of stores) {
        // 이상한 스토어 이름을 가진 것들을 처리하고 수정할 수 없는 것들은 제외
        const storeName = store.constructor.displayName ?? store.constructor.persistKey ?? store.constructor.name ?? store.getName();
        if (storeName.length === 1) continue;
        const ownProps = Object.getOwnPropertyNames(store.constructor.prototype).filter(n => n !== "constructor");
        mapped[storeName] = {
            properties: ownProps.filter(p => typeof(store[p]) !== "function"),
            methods: ownProps.filter(p => typeof(store[p]) === "function")
        };
    }

    // 스토어 매핑을 사용하여 마크다운 생성
    const docs = [];
    const storeNames = Object.keys(mapped).sort();
    for (const name of storeNames) {
        // 스토어 이름과 속성 목록 추가
        const lines = [`### ${name}`, "", "**속성들 (Properties)**"];
        for (const prop of mapped[name].properties) lines.push(`- \`${prop}\``);

        // 간격 버퍼 추가 및 스타일화된 메서드들
        lines.push("", "**메서드들 (Methods)**");
        for (const func of mapped[name].methods) lines.push(`- \`${func}()\``);
        docs.push(lines.join("\n"));
    }
    return docs.join("\n\n---\n\n");
})();
```
:::

## Module List
### AccessibilityStore

**Properties**
- `fontScale`
- `fontSize`
- `isFontScaledUp`
- `isFontScaledDown`
- `fontScaleClass`
- `zoom`
- `isZoomedIn`
- `isZoomedOut`
- `keyboardModeEnabled`
- `colorblindMode`
- `lowContrastMode`
- `saturation`
- `contrast`
- `desaturateUserColors`
- `forcedColorsModalSeen`
- `keyboardNavigationExplainerModalSeen`
- `messageGroupSpacing`
- `isMessageGroupSpacingIncreased`
- `isMessageGroupSpacingDecreased`
- `isSubmitButtonEnabled`
- `syncProfileThemeWithUserTheme`
- `systemPrefersReducedMotion`
- `rawPrefersReducedMotion`
- `useReducedMotion`
- `systemForcedColors`
- `syncForcedColors`
- `useForcedColors`
- `systemPrefersContrast`
- `systemPrefersCrossfades`
- `alwaysShowLinkDecorations`
- `roleStyle`
- `hideTags`

**Methods**
- `initialize()`
- `getUserAgnosticState()`

---

### ActiveJoinedThreadsStore

**Properties**

**Methods**
- `initialize()`
- `hasActiveJoinedUnreadThreads()`
- `getActiveUnjoinedThreadsForParent()`
- `getActiveJoinedThreadsForParent()`
- `getActiveJoinedThreadsForGuild()`
- `getActiveJoinedUnreadThreadsForGuild()`
- `getActiveJoinedUnreadThreadsForParent()`
- `getActiveJoinedRelevantThreadsForGuild()`
- `getActiveJoinedRelevantThreadsForParent()`
- `getActiveUnjoinedThreadsForGuild()`
- `getActiveUnjoinedUnreadThreadsForGuild()`
- `getActiveUnjoinedUnreadThreadsForParent()`
- `getNewThreadCountsForGuild()`
- `computeAllActiveJoinedThreads()`
- `getNewThreadCount()`
- `getActiveThreadCount()`

---

### ActiveThreadsStore

**Properties**

**Methods**
- `initialize()`
- `isActive()`
- `getThreadsForGuild()`
- `getThreadsForParent()`
- `hasThreadsForChannel()`
- `forEachGuild()`
- `hasLoaded()`

---

### ActivityInviteEducationStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `shouldShowEducation()`

---

### ActivityLauncherStore

**Properties**

**Methods**
- `getState()`
- `getStates()`

---

### ActivityShelfStore

**Properties**

**Methods**
- `initialize()`
- `getState()`

---

### AdyenStore

**Properties**
- `client`
- `cashAppPayComponent`

**Methods**

---

### AppIconPersistedStoreState

**Properties**
- `isEditorOpen`
- `isUpsellPreview`

**Methods**
- `initialize()`
- `getState()`
- `getCurrentDesktopIcon()`

---

### AppLauncherStore

**Properties**

**Methods**
- `initialize()`
- `shouldShowPopup()`
- `shouldShowModal()`
- `entrypoint()`
- `lastShownEntrypoint()`
- `activeViewType()`
- `closeReason()`
- `initialState()`
- `appDMChannelsWithFailedLoads()`

---

### AppViewStore

**Properties**

**Methods**
- `initialize()`
- `getHomeLink()`

---

### ApplicationAssetsStore

**Properties**

**Methods**
- `getApplicationAssetFetchState()`
- `getFetchingIds()`
- `getApplicationAssets()`

---

### ApplicationBuildStore

**Properties**

**Methods**
- `initialize()`
- `getTargetBuildId()`
- `getTargetManifests()`
- `hasNoBuild()`
- `isFetching()`
- `needsToFetchBuildSize()`
- `getBuildSize()`

---

### ApplicationCommandAutocompleteStore

**Properties**

**Methods**
- `initialize()`
- `getLastErrored()`
- `getAutocompleteChoices()`
- `getAutocompleteLastChoices()`
- `getLastResponseNonce()`

---

### ApplicationCommandFrecencyStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `hasPendingUsage()`
- `getCommandFrecencyWithoutLoadingLatest()`
- `getScoreWithoutLoadingLatest()`
- `getTopCommandsWithoutLoadingLatest()`

---

### ApplicationCommandIndexStore

**Properties**

**Methods**
- `initialize()`
- `getContextState()`
- `hasContextStateApplication()`
- `getGuildState()`
- `getUserState()`
- `hasUserStateApplication()`
- `getApplicationState()`
- `getApplicationStates()`
- `hasApplicationState()`
- `query()`
- `queryInstallOnDemandApp()`

---

### ApplicationCommandStore

**Properties**

**Methods**
- `initialize()`
- `getActiveCommand()`
- `getActiveCommandSection()`
- `getActiveOptionName()`
- `getActiveOption()`
- `getPreferredCommandId()`
- `getOptionStates()`
- `getOptionState()`
- `getCommandOrigin()`
- `getSource()`
- `getOption()`
- `getState()`

---

### ApplicationDirectoryApplicationsStore

**Properties**

**Methods**
- `getApplication()`
- `getApplicationRecord()`
- `getApplications()`
- `getApplicationFetchState()`
- `getApplicationFetchStates()`
- `isInvalidApplication()`
- `getInvalidApplicationIds()`
- `isFetching()`
- `getApplicationLastFetchTime()`

---

### ApplicationDirectoryCategoriesStore

**Properties**

**Methods**
- `getLastFetchTimeMs()`
- `getCategories()`
- `getCategory()`

---

### ApplicationDirectorySearchStore

**Properties**

**Methods**
- `getSearchResults()`
- `getFetchState()`

---

### ApplicationDirectorySimilarApplicationsStore

**Properties**

**Methods**
- `getSimilarApplications()`
- `getFetchState()`

---

### ApplicationFrecencyStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `hasPendingUsage()`
- `getApplicationFrecencyWithoutLoadingLatest()`
- `getScoreWithoutLoadingLatest()`
- `getTopApplicationsWithoutLoadingLatest()`

---

### ApplicationStatisticsStore

**Properties**

**Methods**
- `getStatisticsForApplication()`
- `shouldFetchStatisticsForApplication()`

---

### ApplicationStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `_getAllApplications()`
- `getApplications()`
- `getGuildApplication()`
- `getGuildApplicationIds()`
- `getApplication()`
- `getApplicationByName()`
- `getApplicationLastUpdated()`
- `isFetchingApplication()`
- `didFetchingApplicationFail()`
- `getFetchingOrFailedFetchingIds()`
- `getAppIdForBotUserId()`

---

### ApplicationStoreDirectoryStore

**Properties**

**Methods**
- `initialize()`
- `hasStorefront()`
- `getStoreLayout()`
- `getFetchStatus()`

---

### ApplicationStoreLocationStore

**Properties**

**Methods**
- `getCurrentPath()`
- `getCurrentRoute()`
- `reset()`

---

### ApplicationStoreSettingsStore

**Properties**
- `didMatureAgree`

**Methods**

---

### ApplicationStoreUserSettingsStore

**Properties**
- `hasAcceptedStoreTerms`

**Methods**
- `initialize()`
- `getState()`
- `hasAcceptedEULA()`

---

### ApplicationStreamPreviewStore

**Properties**

**Methods**
- `getPreviewURL()`
- `getPreviewURLForStreamKey()`
- `getIsPreviewLoading()`

---

### ApplicationStreamingSettingsStore

**Properties**

**Methods**
- `initialize()`
- `getState()`

---

### ApplicationStreamingStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `isSelfStreamHidden()`
- `getLastActiveStream()`
- `getAllActiveStreams()`
- `getAllActiveStreamsForChannel()`
- `getActiveStreamForStreamKey()`
- `getActiveStreamForApplicationStream()`
- `getCurrentUserActiveStream()`
- `getActiveStreamForUser()`
- `getStreamerActiveStreamMetadata()`
- `getStreamerActiveStreamMetadataForStream()`
- `getIsActiveStreamPreviewDisabled()`
- `getAnyStreamForUser()`
- `getAnyDiscoverableStreamForUser()`
- `getStreamForUser()`
- `getRTCStream()`
- `getAllApplicationStreams()`
- `getAllApplicationStreamsForChannel()`
- `getViewerIds()`
- `getCurrentAppIntent()`
- `getStreamingState()`

---

### ApplicationSubscriptionChannelNoticeStore

**Properties**

**Methods**
- `initialize()`
- `getUserAgnosticState()`
- `getLastGuildDismissedTime()`

---

### ApplicationSubscriptionStore

**Properties**

**Methods**
- `getSubscriptionGroupListingsForApplicationFetchState()`
- `getSubscriptionGroupListing()`
- `getSubscriptionGroupListingForSubscriptionListing()`
- `getSubscriptionListing()`
- `getSubscriptionListingsForApplication()`
- `getEntitlementsForGuildFetchState()`
- `getSubscriptionListingForPlan()`
- `getApplicationEntitlementsForGuild()`
- `getEntitlementsForGuild()`

---

### ApplicationViewStore

**Properties**
- `applicationFilterQuery`
- `applicationViewItems`
- `launchableApplicationViewItems`
- `libraryApplicationViewItems`
- `filteredLibraryApplicationViewItems`
- `sortedFilteredLibraryApplicationViewItems`
- `hiddenLibraryApplicationViewItems`
- `hasFetchedApplications`

**Methods**
- `initialize()`

---

### AppliedGuildBoostStore

**Properties**
- `isModifyingAppliedBoost`
- `applyBoostError`
- `unapplyBoostError`
- `cooldownEndsAt`
- `isFetchingCurrentUserAppliedBoosts`

**Methods**
- `getAppliedGuildBoostsForGuild()`
- `getLastFetchedAtForGuild()`
- `getCurrentUserAppliedBoosts()`
- `getAppliedGuildBoost()`

---

### ArchivedThreadsStore

**Properties**
- `canLoadMore`
- `nextOffset`
- `isInitialLoad`

**Methods**
- `initialize()`
- `isLoading()`
- `getThreads()`

---

### AuthInviteStore

**Properties**

**Methods**
- `getGuild()`

---

### AuthSessionsStore

**Properties**

**Methods**
- `getSessions()`

---

### AuthorizedAppsStore

**Properties**

**Methods**
- `initialize()`
- `getApps()`
- `getFetchState()`

---

### AutoUpdateStore

**Properties**

**Methods**
- `getState()`

---

### BasicGuildStore

**Properties**

**Methods**
- `getGuild()`
- `getGuildOrStatus()`
- `getVersion()`

---

### BillingInfoStore

**Properties**
- `isBusy`
- `isUpdatingPaymentSource`
- `isRemovingPaymentSource`
- `isSyncing`
- `isSubscriptionFetching`
- `isPaymentSourceFetching`
- `editSourceError`
- `removeSourceError`
- `ipCountryCodeLoaded`
- `ipCountryCode`
- `ipCountryCodeRequest`
- `ipCountryCodeWithFallback`
- `ipCountryCodeHasError`
- `paymentSourcesFetchRequest`
- `localizedPricingPromo`
- `localizedPricingPromoHasError`
- `isLocalizedPromoEnabled`

**Methods**

---

### BitRateStore

**Properties**
- `bitrate`

**Methods**

---

### BlockedDomainStore

**Properties**

**Methods**
- `initialize()`
- `getCurrentRevision()`
- `getBlockedDomainList()`
- `isBlockedDomain()`

---

### BraintreeStore

**Properties**

**Methods**
- `getClient()`
- `getPayPalClient()`
- `getVenmoClient()`
- `getLastURL()`

---

### BrowserCheckoutStateStore

**Properties**
- `browserCheckoutState`
- `loadId`

**Methods**

---

### BrowserHandoffStore

**Properties**
- `user`
- `key`

**Methods**
- `initialize()`
- `isHandoffAvailable()`

---

### BurstReactionEffectsStore

**Properties**

**Methods**
- `getReactionPickerAnimation()`
- `getEffectForEmojiId()`

---

### CallChatToastsStore

**Properties**

**Methods**
- `initialize()`
- `getToastsEnabled()`
- `getState()`

---

### CallStore

**Properties**

**Methods**
- `initialize()`
- `getCall()`
- `getCalls()`
- `getMessageId()`
- `isCallActive()`
- `isCallUnavailable()`
- `getInternalState()`

---

### CategoryCollapseStore

**Properties**
- `version`

**Methods**
- `initialize()`
- `getState()`
- `isCollapsed()`
- `getCollapsedCategories()`

---

### CertifiedDeviceStore

**Properties**

**Methods**
- `initialize()`
- `isCertified()`
- `getCertifiedDevice()`
- `getCertifiedDeviceName()`
- `getCertifiedDeviceByType()`
- `isHardwareMute()`
- `hasEchoCancellation()`
- `hasNoiseSuppression()`
- `hasAutomaticGainControl()`
- `getVendor()`
- `getModel()`
- `getRevision()`

---

### ChangelogStore

**Properties**

**Methods**
- `initialize()`
- `getChangelog()`
- `latestChangelogId()`
- `getChangelogLoadStatus()`
- `hasLoadedConfig()`
- `getConfig()`
- `overrideId()`
- `lastSeenChangelogId()`
- `lastSeenChangelogDate()`
- `getStateForDebugging()`
- `isLocked()`

---

### ChannelFollowerStatsStore

**Properties**

**Methods**
- `getFollowerStatsForChannel()`

---

### ChannelFollowingPublishBumpStore

**Properties**

**Methods**
- `initialize()`
- `shouldShowBump()`

---

### ChannelListStore

**Properties**

**Methods**
- `initialize()`
- `getGuild()`
- `getGuildWithoutChangingGuildActionRows()`
- `recentsChannelCount()`

---

### ChannelListUnreadsStore

**Properties**

**Methods**
- `initialize()`
- `getUnreadStateForGuildId()`

---

### ChannelListVoiceCategoryStore

**Properties**

**Methods**
- `initialize()`
- `isVoiceCategoryExpanded()`
- `isVoiceCategoryCollapsed()`
- `getState()`

---

### ChannelMemberStore

**Properties**

**Methods**
- `initialize()`
- `getProps()`
- `getRows()`

---

### ChannelPinsStore

**Properties**

**Methods**
- `initialize()`
- `getPinnedMessages()`
- `loaded()`

---

### ChannelRTCStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getParticipantsVersion()`
- `getParticipants()`
- `getSpeakingParticipants()`
- `getFilteredParticipants()`
- `getVideoParticipants()`
- `getStreamParticipants()`
- `getActivityParticipants()`
- `getParticipant()`
- `getUserParticipantCount()`
- `getParticipantsOpen()`
- `getVoiceParticipantsHidden()`
- `getSelectedParticipantId()`
- `getSelectedParticipant()`
- `getSelectedParticipantStats()`
- `getMode()`
- `getLayout()`
- `getChatOpen()`
- `getAllChatOpen()`
- `isFullscreenInContext()`
- `getStageStreamSize()`
- `getStageVideoLimitBoostUpsellDismissed()`

---

### ChannelSKUStore

**Properties**

**Methods**
- `getSkuIdForChannel()`

---

### ChannelSectionStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getSection()`
- `getSidebarState()`
- `getGuildSidebarState()`
- `getCurrentSidebarChannelId()`
- `getCurrentSidebarMessageId()`

---

### ChannelSettingsIntegrationsStore

**Properties**
- `webhooks`
- `editedWebhook`
- `formState`

**Methods**
- `initialize()`
- `hasChanges()`
- `getWebhook()`
- `showNotice()`
- `getProps()`

---

### ChannelSettingsPermissionsStore

**Properties**
- `editedPermissionIds`
- `permissionOverwrites`
- `selectedOverwriteId`
- `formState`
- `isLockable`
- `locked`
- `channel`
- `category`
- `advancedMode`

**Methods**
- `initialize()`
- `hasChanges()`
- `showNotice()`
- `getPermissionOverwrite()`

---

### ChannelSettingsStore

**Properties**

**Methods**
- `initialize()`
- `hasChanges()`
- `isOpen()`
- `getSection()`
- `getInvites()`
- `showNotice()`
- `getChannel()`
- `getFormState()`
- `getCategory()`
- `getProps()`

---

### ChannelStatusStore

**Properties**

**Methods**
- `getChannelStatus()`

---

### ChannelStore

**Properties**

**Methods**
- `initialize()`
- `hasChannel()`
- `getBasicChannel()`
- `getChannel()`
- `loadAllGuildAndPrivateChannelsFromDisk()`
- `getChannelIds()`
- `getMutablePrivateChannels()`
- `getMutableBasicGuildChannelsForGuild()`
- `getMutableGuildChannelsForGuild()`
- `getSortedPrivateChannels()`
- `getDMFromUserId()`
- `getDMChannelFromUserId()`
- `getMutableDMsByUserIds()`
- `getDMUserIds()`
- `getPrivateChannelsVersion()`
- `getGuildChannelsVersion()`
- `getAllThreadsForParent()`
- `getInitialOverlayState()`
- `getDebugInfo()`

---

### CheckoutRecoveryStore

**Properties**

**Methods**
- `getIsTargeted()`
- `shouldFetchCheckoutRecovery()`

---

### ClanSetupStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getStateForGuild()`
- `getGuildIds()`

---

### ClientThemesBackgroundStore

**Properties**
- `gradientPreset`
- `isEditorOpen`
- `isPreview`
- `isCoachmark`
- `mobilePendingThemeIndex`

**Methods**
- `initialize()`
- `getState()`
- `getLinearGradient()`

---

### ClipsStore

**Properties**

**Methods**
- `initialize()`
- `getClips()`
- `getPendingClips()`
- `getUserAgnosticState()`
- `getSettings()`
- `getLastClipsSession()`
- `getClipsWarningShown()`
- `getActiveAnimation()`
- `getStreamClipAnimations()`
- `hasAnyClipAnimations()`
- `getHardwareClassification()`
- `getHardwareClassificationForDecoupled()`
- `getHardwareClassificationVersion()`
- `getIsAtMaxSaveClipOperations()`
- `getLastClipsError()`
- `isClipsEnabledForUser()`
- `isVoiceRecordingAllowedForUser()`
- `isViewerClippingAllowedForUser()`
- `isDecoupledGameClippingEnabled()`
- `hasClips()`
- `hasTakenDecoupledClip()`
- `getNewClipIds()`

---

### CloudSyncStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `isSyncing()`

---

### CollapsedVoiceChannelStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getCollapsed()`
- `isCollapsed()`

---

### CollectiblesCategoryStore

**Properties**
- `isFetchingCategories`
- `error`
- `lastErrorTimestamp`
- `lastSuccessfulFetch`
- `lastFetchOptions`
- `categories`
- `products`
- `recommendedGiftSkuIds`

**Methods**
- `initialize()`
- `isFetchingProduct()`
- `getCategory()`
- `getProduct()`
- `getProductByStoreListingId()`
- `getCategoryForProduct()`

---

### CollectiblesMarketingsStore

**Properties**
- `fetchState`

**Methods**
- `getMarketingBySurface()`

---

### CollectiblesPurchaseStore

**Properties**
- `isFetching`
- `isClaiming`
- `purchases`
- `fetchError`
- `claimError`
- `hasPreviouslyFetched`

**Methods**
- `getPurchase()`

---

### CollectiblesShopStore

**Properties**
- `analyticsLocations`
- `analyticsSource`
- `initialProductSkuId`

**Methods**
- `getAnalytics()`

---

### CommandsMigrationStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `shouldShowChannelNotice()`
- `canShowOverviewTooltip()`
- `canShowToggleTooltip()`

---

### ConnectedAccountsStore

**Properties**

**Methods**
- `isJoining()`
- `joinErrorMessage()`
- `isFetching()`
- `getAccounts()`
- `getLocalAccounts()`
- `getAccount()`
- `getLocalAccount()`
- `isSuggestedAccountType()`
- `addPendingAuthorizedState()`
- `deletePendingAuthorizedState()`
- `hasPendingAuthorizedState()`

---

### ConnectedAppsStore

**Properties**
- `connections`

**Methods**
- `isConnected()`
- `getApplication()`
- `getAllConnections()`

---

### ConnectedDeviceStore

**Properties**
- `initialized`
- `lastDeviceConnected`
- `inputDevices`
- `lastInputSystemDevice`
- `outputDevices`
- `lastOutputSystemDevice`

**Methods**
- `initialize()`
- `getUserAgnosticState()`

---

### ConsentStore

**Properties**
- `fetchedConsents`
- `receivedConsentsInConnectionOpen`

**Methods**
- `hasConsented()`
- `getAuthenticationConsentRequired()`

---

### ConsumablesStore

**Properties**

**Methods**
- `getPrice()`
- `isFetchingPrice()`
- `getErrored()`
- `getEntitlement()`
- `isEntitlementFetched()`
- `isEntitlementFetching()`
- `getPreviousGoLiveSettings()`

---

### ContentInventoryActivityStore

**Properties**

**Methods**
- `initialize()`
- `getMatchingActivity()`

---

### ContentInventoryOutboxStore

**Properties**
- `deleteOutboxEntryError`
- `isDeletingEntryHistory`
- `hasInitialized`

**Methods**
- `getMatchingOutboxEntry()`
- `getUserOutbox()`
- `isFetchingUserOutbox()`

---

### ContentInventoryPersistedStore

**Properties**
- `hidden`

**Methods**
- `initialize()`
- `getState()`
- `getImpressionCappedItemIds()`
- `getDebugFastImpressionCappingEnabled()`
- `reset()`

---

### ContentInventoryStore

**Properties**

**Methods**
- `getFeeds()`
- `getFeed()`
- `getFeedState()`
- `getLastFeedFetchDate()`
- `getFilters()`
- `getFeedRequestId()`
- `getDebugImpressionCappingDisabled()`
- `getMatchingInboxEntry()`

---

### ContextMenuStore

**Properties**
- `version`

**Methods**
- `isOpen()`
- `getContextMenu()`
- `close()`

---

### CreatorMonetizationMarketingStore

**Properties**

**Methods**
- `getEligibleGuildsForNagActivate()`

---

### CreatorMonetizationStore

**Properties**

**Methods**
- `getPriceTiersFetchStateForGuildAndType()`
- `getPriceTiersForGuildAndType()`

---

### DCFEventStore

**Properties**

**Methods**
- `getDCFEvents()`

---

### DataHarvestStore

**Properties**
- `harvestType`
- `requestingHarvest`

**Methods**

---

### DefaultRouteStore

**Properties**
- `defaultRoute`
- `lastNonVoiceRoute`
- `fallbackRoute`

**Methods**
- `initialize()`
- `getState()`

---

### DetectableGameSupplementalStore

**Properties**

**Methods**
- `canFetch()`
- `isFetching()`
- `getGame()`
- `getGames()`
- `getLocalizedName()`
- `getThemes()`
- `getCoverImageUrl()`

---

### DetectedOffPlatformPremiumPerksStore

**Properties**

**Methods**
- `initialize()`
- `getDetectedOffPlatformPremiumPerks()`

---

### DevToolsDesignTogglesStore

**Properties**

**Methods**
- `getUserAgnosticState()`
- `initialize()`
- `get()`
- `set()`
- `all()`
- `allWithDescriptions()`

---

### DevToolsDevSettingsStore

**Properties**

**Methods**
- `getUserAgnosticState()`
- `initialize()`
- `get()`
- `set()`
- `all()`
- `allByCategory()`

---

### DevToolsSettingsStore

**Properties**
- `sidebarWidth`
- `lastOpenTabId`
- `displayTools`
- `showDevWidget`
- `devWidgetPosition`

**Methods**
- `initialize()`
- `getUserAgnosticState()`

---

### DeveloperActivityShelfStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getIsEnabled()`
- `getLastUsedObject()`
- `getUseActivityUrlOverride()`
- `getActivityUrlOverride()`
- `getFetchState()`
- `getFilter()`
- `getDeveloperShelfItems()`
- `inDevModeForApplication()`

---

### DeveloperExperimentStore

**Properties**

**Methods**
- `initialize()`
- `getExperimentDescriptor()`

---

### DeveloperOptionsStore

**Properties**
- `isTracingRequests`
- `isForcedCanary`
- `isLoggingGatewayEvents`
- `isLoggingOverlayEvents`
- `isLoggingAnalyticsEvents`
- `isAxeEnabled`
- `cssDebuggingEnabled`
- `layoutDebuggingEnabled`
- `sourceMapsEnabled`
- `isAnalyticsDebuggerEnabled`
- `isBugReporterEnabled`
- `isIdleStatusIndicatorEnabled`
- `appDirectoryIncludesInactiveCollections`
- `isStreamInfoOverlayEnabled`

**Methods**
- `initialize()`
- `getDebugOptionsHeaderValue()`

---

### DimensionStore

**Properties**

**Methods**
- `percentageScrolled()`
- `getChannelDimensions()`
- `getGuildDimensions()`
- `getGuildListDimensions()`
- `isAtBottom()`

---

### DismissibleContentFrameworkStore

**Properties**
- `dailyCapOverridden`
- `newUserMinAgeRequiredOverridden`
- `lastDCDismissed`

**Methods**
- `initialize()`
- `getState()`
- `getRenderedAtTimestamp()`
- `hasUserHitDCCap()`

---

### DispatchApplicationErrorStore

**Properties**

**Methods**
- `getLastError()`

---

### DispatchApplicationLaunchSetupStore

**Properties**

**Methods**
- `getLastProgress()`
- `isRunning()`

---

### DispatchApplicationStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `isUpToDate()`
- `shouldPatch()`
- `isInstalled()`
- `supportsCloudSync()`
- `isLaunchable()`
- `getDefaultLaunchOption()`
- `getLaunchOptions()`
- `getHistoricalTotalBytesRead()`
- `getHistoricalTotalBytesDownloaded()`
- `getHistoricalTotalBytesWritten()`
- `whenInitialized()`

---

### DispatchManagerStore

**Properties**
- `activeItems`
- `finishedItems`
- `paused`

**Methods**
- `initialize()`
- `getQueuePosition()`
- `isCorruptInstallation()`

---

### DomainMigrationStore

**Properties**

**Methods**
- `getMigrationStatus()`

---

### DraftStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getThreadDraftWithParentMessageId()`
- `getRecentlyEditedDrafts()`
- `getDraft()`
- `getThreadSettings()`

---

### EditMessageStore

**Properties**

**Methods**
- `isEditing()`
- `isEditingAny()`
- `getEditingTextValue()`
- `getEditingRichValue()`
- `getEditingMessageId()`
- `getEditingMessage()`
- `getEditActionSource()`

---

### EmailSettingsStore

**Properties**

**Methods**
- `getEmailSettings()`

---

### EmbeddedActivitiesStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getSelfEmbeddedActivityForChannel()`
- `getSelfEmbeddedActivities()`
- `getEmbeddedActivitiesForGuild()`
- `getEmbeddedActivitiesForChannel()`
- `getEmbeddedActivitiesByChannel()`
- `getEmbeddedActivityDurationMs()`
- `isLaunchingActivity()`
- `getShelfActivities()`
- `getShelfFetchStatus()`
- `shouldFetchShelf()`
- `getOrientationLockStateForApp()`
- `getPipOrientationLockStateForApp()`
- `getGridOrientationLockStateForApp()`
- `getLayoutModeForApp()`
- `getConnectedActivityChannelId()`
- `getActivityPanelMode()`
- `getFocusedLayout()`
- `getCurrentEmbeddedActivity()`
- `getEmbeddedActivityForUserId()`
- `hasActivityEverBeenLaunched()`
- `getLaunchState()`
- `getLaunchStates()`
- `getActivityPopoutWindowLayout()`

---

### EmojiCaptionsStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getCaptionsForEmojiById()`
- `getIsFetching()`
- `getEmojiCaptionsTTL()`
- `hasPersistedState()`
- `clear()`

---

### EmojiStore

**Properties**
- `loadState`
- `expandedSectionsByGuildIds`
- `categories`
- `diversitySurrogate`
- `emojiFrecencyWithoutFetchingLatest`
- `emojiReactionFrecencyWithoutFetchingLatest`

**Methods**
- `initialize()`
- `getState()`
- `hasPendingUsage()`
- `getGuildEmoji()`
- `getUsableGuildEmoji()`
- `getGuilds()`
- `getDisambiguatedEmojiContext()`
- `getSearchResultsOrder()`
- `searchWithoutFetchingLatest()`
- `getUsableCustomEmojiById()`
- `getCustomEmojiById()`
- `getTopEmoji()`
- `getNewlyAddedEmoji()`
- `getTopEmojisMetadata()`
- `getEmojiAutosuggestion()`
- `hasUsableEmojiInAnyGuild()`
- `hasFavoriteEmojis()`

---

### EnablePublicGuildUpsellNoticeStore

**Properties**

**Methods**
- `initialize()`
- `isVisible()`

---

### EntitlementStore

**Properties**
- `fetchingAllEntitlements`
- `fetchedAllEntitlements`
- `applicationIdsFetching`
- `applicationIdsFetched`

**Methods**
- `initialize()`
- `get()`
- `getGiftable()`
- `getForApplication()`
- `getForSku()`
- `isFetchingForApplication()`
- `isFetchedForApplication()`
- `getForSubscription()`
- `isEntitledToSku()`
- `hasFetchedForApplicationIds()`
- `getFractionalPremium()`
- `getUnactivatedFractionalPremiumUnits()`

---

### EventDirectoryStore

**Properties**

**Methods**
- `isFetching()`
- `getEventDirectoryEntries()`
- `getCachedGuildByEventId()`
- `getCachedGuildScheduledEventById()`

---

### ExpandedGuildFolderStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getExpandedFolders()`
- `isFolderExpanded()`

---

### ExperimentStore

**Properties**
- `hasLoadedExperiments`

**Methods**
- `initialize()`
- `loadCache()`
- `takeSnapshot()`
- `hasRegisteredExperiment()`
- `getUserExperimentDescriptor()`
- `getGuildExperimentDescriptor()`
- `getUserExperimentBucket()`
- `getGuildExperimentBucket()`
- `getAllUserExperimentDescriptors()`
- `getGuildExperiments()`
- `getLoadedUserExperiment()`
- `getLoadedGuildExperiment()`
- `getRecentExposures()`
- `getRegisteredExperiments()`
- `getAllExperimentOverrideDescriptors()`
- `getExperimentOverrideDescriptor()`
- `getAllExperimentAssignments()`
- `getSerializedState()`
- `hasExperimentTrackedExposure()`

---

### ExternalStreamingStore

**Properties**

**Methods**
- `initialize()`
- `getStream()`

---

### FalsePositiveStore

**Properties**
- `validContentScanVersion`

**Methods**
- `getFpMessageInfo()`
- `getChannelFpInfo()`
- `canSubmitFpReport()`

---

### FamilyCenterStore

**Properties**

**Methods**
- `initialize()`
- `loadCache()`
- `takeSnapshot()`
- `getSelectedTeenId()`
- `getLinkedUsers()`
- `getLinkTimestamp()`
- `getRangeStartTimestamp()`
- `getActionsForDisplayType()`
- `getTotalForDisplayType()`
- `getLinkCode()`
- `getGuild()`
- `getSelectedTab()`
- `getStartId()`
- `getIsInitialized()`
- `getUserCountry()`
- `isLoading()`
- `canRefetch()`

---

### FavoriteStore

**Properties**
- `favoriteServerMuted`

**Methods**
- `initialize()`
- `getFavoriteChannels()`
- `isFavorite()`
- `getFavorite()`
- `getCategoryRecord()`
- `getNickname()`

---

### FavoritesSuggestionStore

**Properties**

**Methods**
- `initialize()`
- `getSuggestedChannelId()`
- `getState()`

---

### FirstPartyRichPresenceStore

**Properties**

**Methods**
- `initialize()`
- `getActivities()`

---

### ForumActivePostStore

**Properties**

**Methods**
- `initialize()`
- `getNewThreadCount()`
- `getCanAckThreads()`
- `getThreadIds()`
- `getCurrentThreadIds()`
- `getAndDeleteMostRecentUserCreatedThreadId()`
- `getFirstNoReplyThreadId()`

---

### ForumChannelAdminOnboardingGuideStore

**Properties**

**Methods**
- `initialize()`
- `hasHidden()`
- `getState()`

---

### ForumPostMessagesStore

**Properties**

**Methods**
- `initialize()`
- `isLoading()`
- `getMessage()`

---

### ForumPostUnreadCountStore

**Properties**

**Methods**
- `initialize()`
- `getCount()`
- `getThreadIdsMissingCounts()`

---

### ForumSearchStore

**Properties**

**Methods**
- `getSearchQuery()`
- `getSearchLoading()`
- `getSearchResults()`
- `getHasSearchResults()`

---

### FrecencyStore

**Properties**
- `frecencyWithoutFetchingLatest`

**Methods**
- `initialize()`
- `getState()`
- `hasPendingUsage()`
- `getFrequentlyWithoutFetchingLatest()`
- `getScoreWithoutFetchingLatest()`
- `getScoreForDMWithoutFetchingLatest()`
- `getMaxScore()`
- `getBonusScore()`

---

### FriendSuggestionStore

**Properties**

**Methods**
- `initialize()`
- `getSuggestionCount()`
- `getSuggestions()`
- `getSuggestion()`

---

### FriendsStore

**Properties**

**Methods**
- `initialize()`
- `getState()`

---

### GIFPickerViewStore

**Properties**

**Methods**
- `getAnalyticsID()`
- `getQuery()`
- `getResultQuery()`
- `getResultItems()`
- `getTrendingCategories()`
- `getSelectedFormat()`
- `getSuggestions()`
- `getTrendingSearchTerms()`

---

### GameConsoleStore

**Properties**

**Methods**
- `initialize()`
- `getUserAgnosticState()`
- `getDevicesForPlatform()`
- `getLastSelectedDeviceByPlatform()`
- `getDevice()`
- `getFetchingDevices()`
- `getPendingDeviceCommands()`
- `getRemoteSessionId()`
- `getAwaitingRemoteSessionInfo()`

---

### GameInviteStore

**Properties**

**Methods**
- `getInvites()`
- `getInviteStatuses()`
- `isInviteGameInstalled()`
- `isInviteJoinable()`
- `getLastUnseenInvite()`
- `getUnseenInviteCount()`

---

### GameLibraryViewStore

**Properties**
- `sortDirection`
- `sortKey`
- `activeRowKey`
- `isNavigatingByKeyboard`

**Methods**
- `initialize()`

---

### GamePartyStore

**Properties**

**Methods**
- `initialize()`
- `getParty()`
- `getUserParties()`
- `getParties()`

---

### GameStore

**Properties**
- `games`
- `fetching`
- `detectableGamesEtag`
- `lastFetched`

**Methods**
- `initialize()`
- `getState()`
- `getDetectableGame()`
- `getGameByName()`
- `isGameInDatabase()`
- `getGameByExecutable()`
- `getGameByGameData()`
- `shouldReport()`
- `markGameReported()`

---

### GatedChannelStore

**Properties**

**Methods**
- `initialize()`
- `isChannelGated()`
- `isChannelGatedAndVisible()`
- `isChannelOrThreadParentGated()`

---

### GatewayConnectionStore

**Properties**

**Methods**
- `initialize()`
- `getSocket()`
- `isTryingToConnect()`
- `isConnected()`
- `isConnectedOrOverlay()`
- `lastTimeConnectedChanged()`

---

### GiftCodeStore

**Properties**

**Methods**
- `get()`
- `getError()`
- `getForGifterSKUAndPlan()`
- `getIsResolving()`
- `getIsResolved()`
- `getIsAccepting()`
- `getUserGiftCodesFetchingForSKUAndPlan()`
- `getUserGiftCodesLoadedAtForSKUAndPlan()`
- `getResolvingCodes()`
- `getResolvedCodes()`
- `getAcceptingCodes()`

---

### GlobalDiscoveryServersSearchCountStore

**Properties**

**Methods**
- `getIsInitialFetchComplete()`
- `getIsFetchingCounts()`
- `getCounts()`

---

### GlobalDiscoveryServersSearchLayoutStore

**Properties**

**Methods**
- `initialize()`
- `getVisibleTabs()`

---

### GlobalDiscoveryServersSearchResultsStore

**Properties**

**Methods**
- `getGuild()`
- `getGuildIds()`
- `getIsFetching()`
- `getIsInitialFetchComplete()`
- `getOffset()`
- `getTotal()`
- `getLastFetchTimestamp()`
- `getError()`
- `getErrorMessage()`
- `getAlgoliaSearchIndex()`
- `getIsAlgoliaInitialized()`
- `getIsBlocked()`

---

### GuildAffinitiesStore

**Properties**
- `affinities`
- `hasRequestResolved`

**Methods**
- `initialize()`
- `getState()`
- `getGuildAffinity()`

---

### GuildAutomodMessageStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getMessage()`
- `getMessagesVersion()`
- `getMentionRaidDetected()`
- `getLastIncidentAlertMessage()`

---

### GuildAvailabilityStore

**Properties**
- `totalGuilds`
- `totalUnavailableGuilds`
- `unavailableGuilds`

**Methods**
- `initialize()`
- `isUnavailable()`

---

### GuildBoostSlotStore

**Properties**
- `hasFetched`
- `boostSlots`

**Methods**
- `initialize()`
- `getGuildBoostSlot()`

---

### GuildBoostingGracePeriodNoticeStore

**Properties**

**Methods**
- `initialize()`
- `getLastDismissedGracePeriodForGuild()`
- `isVisible()`
- `getState()`

---

### GuildBoostingNoticeStore

**Properties**

**Methods**
- `initialize()`
- `channelNoticePredicate()`

---

### GuildBoostingProgressBarPersistedStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getCountForGuild()`

---

### GuildCategoryStore

**Properties**

**Methods**
- `initialize()`
- `getCategories()`

---

### GuildChannelStore

**Properties**

**Methods**
- `initialize()`
- `getAllGuilds()`
- `getChannels()`
- `getFirstChannelOfType()`
- `getFirstChannel()`
- `getDefaultChannel()`
- `getSFWDefaultChannel()`
- `getSelectableChannelIds()`
- `getSelectableChannels()`
- `getVocalChannelIds()`
- `getDirectoryChannelIds()`
- `hasSelectableChannel()`
- `hasElevatedPermissions()`
- `hasChannels()`
- `hasCategories()`
- `getTextChannelNameDisambiguations()`

---

### GuildDirectorySearchStore

**Properties**

**Methods**
- `getSearchState()`
- `getSearchResults()`
- `shouldFetch()`

---

### GuildDirectoryStore

**Properties**

**Methods**
- `isFetching()`
- `getCurrentCategoryId()`
- `getDirectoryEntries()`
- `getDirectoryEntry()`
- `getDirectoryAllEntriesCount()`
- `getDirectoryCategoryCounts()`
- `getAdminGuildEntryIds()`

---

### GuildDiscoveryCategoryStore

**Properties**

**Methods**
- `getPrimaryCategories()`
- `getDiscoveryCategories()`
- `getClanDiscoveryCategories()`
- `getAllCategories()`
- `getFetchedLocale()`
- `getCategoryName()`

---

### GuildIdentitySettingsStore

**Properties**

**Methods**
- `getFormState()`
- `getErrors()`
- `showNotice()`
- `getIsSubmitDisabled()`
- `getPendingAvatar()`
- `getPendingAvatarDecoration()`
- `getPendingProfileEffectId()`
- `getPendingBanner()`
- `getPendingBio()`
- `getPendingNickname()`
- `getPendingPronouns()`
- `getPendingAccentColor()`
- `getPendingThemeColors()`
- `getAllPending()`
- `getGuild()`
- `getSource()`
- `getAnalyticsLocations()`

---

### GuildIncidentsStore

**Properties**

**Methods**
- `initialize()`
- `getGuildIncident()`
- `getIncidentsByGuild()`
- `getGuildAlertSettings()`

---

### GuildJoinRequestStoreV2

**Properties**

**Methods**
- `getRequest()`
- `getRequests()`
- `getSubmittedGuildJoinRequestTotal()`
- `isFetching()`
- `hasFetched()`
- `getSelectedApplicationTab()`
- `getSelectedSortOrder()`
- `getSelectedGuildJoinRequest()`

---

### GuildLeaderboardRanksStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getPrevLeaderboardRanks()`
- `getCurrentLeaderboardRanks()`
- `reset()`

---

### GuildLeaderboardStore

**Properties**

**Methods**
- `getLeaderboards()`
- `get()`
- `getLeaderboardResponse()`

---

### GuildMFAWarningStore

**Properties**

**Methods**
- `initialize()`
- `isVisible()`

---

### GuildMemberCountStore

**Properties**

**Methods**
- `getMemberCounts()`
- `getMemberCount()`
- `getOnlineCount()`

---

### GuildMemberRequesterStore

**Properties**

**Methods**
- `initialize()`
- `requestMember()`

---

### GuildMemberStore

**Properties**

**Methods**
- `initialize()`
- `getMutableAllGuildsAndMembers()`
- `memberOf()`
- `getNicknameGuildsMapping()`
- `getNicknames()`
- `isMember()`
- `isGuestOrLurker()`
- `isCurrentUserGuest()`
- `getMemberIds()`
- `getMembers()`
- `getTrueMember()`
- `getMember()`
- `getSelfMember()`
- `getCachedSelfMember()`
- `getNick()`
- `getCommunicationDisabledUserMap()`
- `getCommunicationDisabledVersion()`
- `getPendingRoleUpdates()`
- `getMemberRoleWithPendingUpdates()`
- `getMemberVersion()`

---

### GuildNSFWAgreeStore

**Properties**

**Methods**
- `initialize()`
- `didAgree()`

---

### GuildOnboardingHomeNavigationStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getSelectedResourceChannelId()`
- `getHomeNavigationChannelId()`

---

### GuildOnboardingHomeSettingsStore

**Properties**

**Methods**
- `getSettings()`
- `getNewMemberActions()`
- `getActionForChannel()`
- `hasMemberAction()`
- `getResourceChannels()`
- `getResourceForChannel()`
- `getIsLoading()`
- `getWelcomeMessage()`
- `hasSettings()`
- `getEnabled()`
- `getNewMemberAction()`

---

### GuildOnboardingMemberActionStore

**Properties**

**Methods**
- `getCompletedActions()`
- `hasCompletedActionForChannel()`
- `getState()`

---

### GuildOnboardingPromptsStore

**Properties**

**Methods**
- `initialize()`
- `getOnboardingPromptsForOnboarding()`
- `getOnboardingPrompts()`
- `getOnboardingResponses()`
- `getSelectedOptions()`
- `getOnboardingResponsesForPrompt()`
- `getEnabledOnboardingPrompts()`
- `getDefaultChannelIds()`
- `getEnabled()`
- `getOnboardingPrompt()`
- `isLoading()`
- `shouldFetchPrompts()`
- `getPendingResponseOptions()`
- `ackIdForGuild()`
- `lastFetchedAt()`
- `isAdvancedMode()`

---

### GuildOnboardingStore

**Properties**

**Methods**
- `shouldShowOnboarding()`
- `getOnboardingStatus()`
- `resetOnboardingStatus()`
- `getCurrentOnboardingStep()`

---

### GuildPopoutStore

**Properties**

**Methods**
- `initialize()`
- `isFetchingGuild()`
- `getGuild()`
- `hasFetchFailed()`

---

### GuildProductsStore

**Properties**

**Methods**
- `getGuildProductsForGuildFetchState()`
- `getGuildProduct()`
- `getGuildProductsForGuild()`
- `getGuildProductFetchState()`
- `isGuildProductsCacheExpired()`

---

### GuildPromptsStore

**Properties**

**Methods**
- `initialize()`
- `hasViewedPrompt()`
- `getState()`

---

### GuildReadStateStore

**Properties**

**Methods**
- `initialize()`
- `loadCache()`
- `takeSnapshot()`
- `hasAnyUnread()`
- `getStoreChangeSentinel()`
- `getMutableUnreadGuilds()`
- `getMutableGuildStates()`
- `hasUnread()`
- `getMentionCount()`
- `getMutableGuildReadState()`
- `getGuildHasUnreadIgnoreMuted()`
- `getTotalMentionCount()`
- `getTotalNotificationsMentionCount()`
- `getPrivateChannelMentionCount()`
- `getMentionCountForChannels()`
- `getMentionCountForPrivateChannel()`
- `getGuildChangeSentinel()`

---

### GuildRoleConnectionEligibilityStore

**Properties**

**Methods**
- `getGuildRoleConnectionEligibility()`

---

### GuildRoleMemberCountStore

**Properties**

**Methods**
- `getRoleMemberCount()`
- `shouldFetch()`

---

### GuildRoleSubscriptionTierTemplatesStore

**Properties**

**Methods**
- `getTemplates()`
- `getTemplateWithCategory()`
- `getChannel()`

---

### GuildRoleSubscriptionsStore

**Properties**

**Methods**
- `getSubscriptionGroupListingsForGuildFetchState()`
- `getDidFetchListingForSubscriptionPlanId()`
- `getSubscriptionGroupListing()`
- `getSubscriptionGroupListingsForGuild()`
- `getSubscriptionGroupListingForSubscriptionListing()`
- `getSubscriptionListing()`
- `getSubscriptionListingsForGuild()`
- `getSubscriptionListingForPlan()`
- `getSubscriptionSettings()`
- `getSubscriptionTrial()`
- `getMonetizationRestrictions()`
- `getMonetizationRestrictionsFetchState()`
- `getApplicationIdForGuild()`

---

### GuildScheduledEventStore

**Properties**

**Methods**
- `getGuildScheduledEvent()`
- `getGuildEventCountByIndex()`
- `getGuildScheduledEventsForGuild()`
- `getGuildScheduledEventsByIndex()`
- `getRsvpVersion()`
- `getRsvp()`
- `isInterestedInEventRecurrence()`
- `getUserCount()`
- `hasUserCount()`
- `isActive()`
- `getActiveEventByChannel()`
- `getUsersForGuildEvent()`

---

### GuildSettingsAuditLogStore

**Properties**
- `logs`
- `integrations`
- `webhooks`
- `guildScheduledEvents`
- `automodRules`
- `threads`
- `applicationCommands`
- `isInitialLoading`
- `isLoading`
- `isLoadingNextPage`
- `hasOlderLogs`
- `hasError`
- `userIds`
- `userIdFilter`
- `targetIdFilter`
- `actionFilter`
- `deletedTargets`
- `groupedFetchCount`

**Methods**

---

### GuildSettingsStore

**Properties**

**Methods**
- `initialize()`
- `getMetadata()`
- `hasChanges()`
- `isOpen()`
- `getSavedRouteState()`
- `getSection()`
- `showNotice()`
- `getGuildId()`
- `showPublicSuccessModal()`
- `getGuild()`
- `isSubmitting()`
- `isGuildMetadataLoaded()`
- `getErrors()`
- `getSelectedRoleId()`
- `getSlug()`
- `getBans()`
- `getProps()`

---

### GuildStore

**Properties**

**Methods**
- `getGuild()`
- `getGuilds()`
- `getGuildIds()`
- `getGuildCount()`
- `isLoaded()`
- `getGeoRestrictedGuilds()`
- `getAllGuildsRoles()`
- `getRoles()`
- `getRole()`

---

### GuildSubscriptionsStore

**Properties**

**Methods**
- `initialize()`
- `getSubscribedThreadIds()`
- `isSubscribedToThreads()`
- `isSubscribedToAnyMember()`
- `isSubscribedToMemberUpdates()`
- `isSubscribedToAnyGuildChannel()`

---

### GuildTemplateStore

**Properties**

**Methods**
- `getGuildTemplate()`
- `getGuildTemplates()`
- `getForGuild()`
- `getDisplayedGuildTemplateCode()`

---

### GuildTemplateTooltipStore

**Properties**

**Methods**
- `shouldShowGuildTemplateDirtyTooltip()`
- `shouldShowGuildTemplatePromotionTooltip()`

---

### GuildVerificationStore

**Properties**

**Methods**
- `initialize()`
- `getCheck()`
- `canChatInGuild()`

---

### HDStreamingViewerStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `cooldownIsActive()`

---

### HangStatusStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getCurrentHangStatus()`
- `getCustomHangStatus()`
- `getRecentCustomStatuses()`
- `getCurrentDefaultStatus()`
- `getHangStatusActivity()`

---

### HighFiveStore

**Properties**

**Methods**
- `initialize()`
- `getWaitingHighFive()`
- `getCompletedHighFive()`
- `getEnabled()`
- `getUserAgnosticState()`

---

### HookErrorStore

**Properties**

**Methods**
- `getHookError()`

---

### HotspotStore

**Properties**

**Methods**
- `initialize()`
- `hasHotspot()`
- `hasHiddenHotspot()`
- `getHotspotOverride()`
- `getState()`

---

### HubLinkNoticeStore

**Properties**

**Methods**
- `initialize()`
- `channelNoticePredicate()`

---

### HypeSquadStore

**Properties**

**Methods**
- `getHouseMembership()`

---

### IdleStore

**Properties**

**Methods**
- `isIdle()`
- `isAFK()`
- `getIdleSince()`

---

### ImpersonateStore

**Properties**

**Methods**
- `hasViewingRoles()`
- `isViewingRoles()`
- `getViewingRoles()`
- `getViewingRolesTimestamp()`
- `getData()`
- `isFullServerPreview()`
- `isOptInEnabled()`
- `isOnboardingEnabled()`
- `getViewingChannels()`
- `getOnboardingResponses()`
- `getMemberOptions()`
- `isChannelOptedIn()`
- `isViewingServerShop()`
- `getImpersonateType()`
- `getBackNavigationSection()`

---

### IncomingCallStore

**Properties**

**Methods**
- `initialize()`
- `getIncomingCalls()`
- `getIncomingCallChannelIds()`
- `getFirstIncomingCallId()`
- `hasIncomingCalls()`

---

### InstallationManagerStore

**Properties**
- `defaultInstallationPath`
- `installationPaths`
- `installationPathsMetadata`

**Methods**
- `initialize()`
- `getState()`
- `hasGamesInstalledInPath()`
- `shouldBeInstalled()`
- `getInstallationPath()`
- `getLabelFromPath()`

---

### InstanceIdStore

**Properties**

**Methods**
- `getId()`

---

### InstantInviteStore

**Properties**

**Methods**
- `getInvite()`
- `getFriendInvite()`
- `getFriendInvitesFetching()`
- `canRevokeFriendInvite()`

---

### IntegrationQueryStore

**Properties**

**Methods**
- `getResults()`
- `getQuery()`

---

### InteractionModalStore

**Properties**

**Methods**
- `getModalState()`

---

### InteractionStore

**Properties**

**Methods**
- `getInteraction()`
- `getMessageInteractionStates()`
- `canQueueInteraction()`
- `getIFrameModalApplicationId()`
- `getIFrameModalKey()`

---

### InviteModalStore

**Properties**

**Methods**
- `initialize()`
- `isOpen()`
- `getProps()`

---

### InviteNoticeStore

**Properties**

**Methods**
- `initialize()`
- `channelNoticePredicate()`

---

### InviteStore

**Properties**

**Methods**
- `getInvite()`
- `getInviteError()`
- `getInvites()`
- `getInviteKeyForGuildId()`

---

### JoinedThreadsStore

**Properties**

**Methods**
- `hasJoined()`
- `joinTimestamp()`
- `flags()`
- `getInitialOverlayState()`
- `getMuteConfig()`
- `getMutedThreads()`
- `isMuted()`

---

### KeybindsStore

**Properties**

**Methods**
- `initialize()`
- `getUserAgnosticState()`
- `hasKeybind()`
- `hasExactKeybind()`
- `getKeybindForAction()`
- `getOverlayKeybind()`
- `getOverlayChatKeybind()`

---

### KeywordFilterStore

**Properties**

**Methods**
- `loadCache()`
- `takeSnapshot()`
- `getKeywordTrie()`
- `initializeForKeywordTests()`

---

### LabFeatureStore

**Properties**

**Methods**
- `getUserAgnosticState()`
- `initialize()`
- `get()`
- `set()`

---

### LaunchableGameStore

**Properties**
- `launchingGames`
- `launchableGames`

**Methods**
- `isLaunchable()`

---

### LayerStore

**Properties**

**Methods**
- `hasLayers()`
- `getLayers()`

---

### LayoutStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getLayouts()`
- `getLayout()`
- `getAllWidgets()`
- `getWidget()`
- `getWidgetsForLayout()`
- `getWidgetConfig()`
- `getWidgetDefaultSettings()`
- `getWidgetType()`
- `getRegisteredWidgets()`
- `getDefaultLayout()`

---

### LibraryApplicationStatisticsStore

**Properties**
- `applicationStatistics`
- `lastFetched`

**Methods**
- `getGameDuration()`
- `getLastPlayedDateTime()`
- `hasApplicationStatistic()`
- `getCurrentUserStatisticsForApplication()`
- `getQuickSwitcherScoreForApplication()`

---

### LibraryApplicationStore

**Properties**
- `libraryApplications`
- `fetched`
- `entitledBranchIds`
- `hasRemovedLibraryApplicationThisSession`

**Methods**
- `initialize()`
- `getAllLibraryApplications()`
- `hasLibraryApplication()`
- `hasApplication()`
- `getLibraryApplication()`
- `getActiveLibraryApplication()`
- `isUpdatingFlags()`
- `getActiveLaunchOptionId()`
- `whenInitialized()`

---

### LiveChannelNoticesStore

**Properties**

**Methods**
- `initialize()`
- `isLiveChannelNoticeHidden()`
- `getState()`

---

### LocalActivityStore

**Properties**

**Methods**
- `initialize()`
- `getActivities()`
- `getPrimaryActivity()`
- `getApplicationActivity()`
- `getCustomStatusActivity()`
- `findActivity()`
- `getApplicationActivities()`
- `getActivityForPID()`

---

### LocalInteractionComponentStateStore

**Properties**

**Methods**
- `getInteractionComponentStates()`
- `getInteractionComponentStateVersion()`
- `getInteractionComponentState()`

---

### LocaleStore

**Properties**
- `locale`

**Methods**
- `initialize()`

---

### LoginRequiredActionStore

**Properties**

**Methods**
- `initialize()`
- `requiredActions()`
- `requiredActionsIncludes()`
- `wasLoginAttemptedInSession()`
- `getState()`

---

### LurkerModePopoutStore

**Properties**

**Methods**
- `initialize()`
- `shouldShowPopout()`

---

### LurkingStore

**Properties**

**Methods**
- `initialize()`
- `setHistorySnapshot()`
- `getHistorySnapshot()`
- `lurkingGuildIds()`
- `mostRecentLurkedGuildId()`
- `isLurking()`
- `getLurkingSource()`
- `getLoadId()`

---

### MFAStore

**Properties**
- `togglingSMS`
- `emailToken`
- `hasSeenBackupPrompt`

**Methods**
- `getVerificationKey()`
- `getBackupCodes()`
- `getNonces()`

---

### MaintenanceStore

**Properties**

**Methods**
- `initialize()`
- `getIncident()`
- `getScheduledMaintenance()`

---

### MaskedLinkStore

**Properties**

**Methods**
- `initialize()`
- `isTrustedDomain()`
- `isTrustedProtocol()`

---

### MaxMemberCountChannelNoticeStore

**Properties**

**Methods**
- `initialize()`
- `isVisible()`

---

### MediaEngineStore

**Properties**

**Methods**
- `initialize()`
- `supports()`
- `supportsInApp()`
- `isSupported()`
- `isExperimentalEncodersSupported()`
- `isNoiseSuppressionSupported()`
- `isNoiseCancellationSupported()`
- `isNoiseCancellationError()`
- `isAutomaticGainControlSupported()`
- `isAdvancedVoiceActivitySupported()`
- `isAecDumpSupported()`
- `isSimulcastSupported()`
- `goLiveSimulcastEnabled()`
- `getAecDump()`
- `getMediaEngine()`
- `getVideoComponent()`
- `getCameraComponent()`
- `isEnabled()`
- `isMute()`
- `isDeaf()`
- `hasContext()`
- `isSelfMutedTemporarily()`
- `isSelfMute()`
- `shouldSkipMuteUnmuteSound()`
- `notifyMuteUnmuteSoundWasSkipped()`
- `isHardwareMute()`
- `isEnableHardwareMuteNotice()`
- `isSelfDeaf()`
- `isVideoEnabled()`
- `isVideoAvailable()`
- `isScreenSharing()`
- `isSoundSharing()`
- `isLocalMute()`
- `supportsDisableLocalVideo()`
- `isLocalVideoDisabled()`
- `getVideoToggleState()`
- `isLocalVideoAutoDisabled()`
- `isAnyLocalVideoAutoDisabled()`
- `isMediaFilterSettingLoading()`
- `isNativeAudioPermissionReady()`
- `getGoLiveSource()`
- `getGoLiveContext()`
- `getLocalPan()`
- `getLocalVolume()`
- `getInputVolume()`
- `getOutputVolume()`
- `getMode()`
- `getModeOptions()`
- `getShortcuts()`
- `getInputDeviceId()`
- `getOutputDeviceId()`
- `getVideoDeviceId()`
- `getInputDevices()`
- `getOutputDevices()`
- `getVideoDevices()`
- `getEchoCancellation()`
- `getSidechainCompression()`
- `getSidechainCompressionStrength()`
- `getH265Enabled()`
- `getLoopback()`
- `getNoiseSuppression()`
- `getAutomaticGainControl()`
- `getNoiseCancellation()`
- `getExperimentalEncoders()`
- `getHardwareEncoding()`
- `getEnableSilenceWarning()`
- `getDebugLogging()`
- `getQoS()`
- `getAttenuation()`
- `getAttenuateWhileSpeakingSelf()`
- `getAttenuateWhileSpeakingOthers()`
- `getAudioSubsystem()`
- `getMLSSigningKey()`
- `getSettings()`
- `getState()`
- `getInputDetected()`
- `getNoInputDetectedNotice()`
- `getPacketDelay()`
- `setCanHavePriority()`
- `isInteractionRequired()`
- `getVideoHook()`
- `supportsVideoHook()`
- `getExperimentalSoundshare()`
- `supportsExperimentalSoundshare()`
- `getUseSystemScreensharePicker()`
- `supportsSystemScreensharePicker()`
- `getOpenH264()`
- `getEverSpeakingWhileMuted()`
- `getSpeakingWhileMuted()`
- `supportsScreenSoundshare()`
- `getVideoStreamParameters()`
- `getSupportedSecureFramesProtocolVersion()`
- `hasClipsSource()`

---

### MediaPostEmbedStore

**Properties**

**Methods**
- `getMediaPostEmbed()`
- `getEmbedFetchState()`
- `getMediaPostEmbeds()`

---

### MediaPostSharePromptStore

**Properties**

**Methods**
- `shouldDisplayPrompt()`

---

### MemberSafetyStore

**Properties**

**Methods**
- `initialize()`
- `isInitialized()`
- `getMembersByGuildId()`
- `getMembersCountByGuildId()`
- `getEstimatedMemberSearchCountByGuildId()`
- `getKnownMemberSearchCountByGuildId()`
- `getCurrentMemberSearchResultsByGuildId()`
- `getSearchStateByGuildId()`
- `hasDefaultSearchStateByGuildId()`
- `getPagedMembersByGuildId()`
- `getPaginationStateByGuildId()`
- `getElasticSearchPaginationByGuildId()`
- `getEnhancedMember()`
- `getNewMemberTimestamp()`
- `getLastRefreshTimestamp()`
- `getLastCursorTimestamp()`

---

### MemberVerificationFormStore

**Properties**

**Methods**
- `get()`
- `getRulesPrompt()`

---

### MessageReactionsStore

**Properties**

**Methods**
- `getReactions()`

---

### MessageRequestPreviewStore

**Properties**

**Methods**
- `initialize()`
- `shouldLoadMessageRequestPreview()`
- `getMessageRequestPreview()`

---

### MessageRequestStore

**Properties**

**Methods**
- `initialize()`
- `loadCache()`
- `takeSnapshot()`
- `getMessageRequestChannelIds()`
- `getMessageRequestsCount()`
- `isMessageRequest()`
- `isAcceptedOptimistic()`
- `getUserCountryCode()`
- `isReady()`

---

### MessageStore

**Properties**

**Methods**
- `initialize()`
- `getMessages()`
- `getMessage()`
- `getLastEditableMessage()`
- `getLastChatCommandMessage()`
- `getLastMessage()`
- `getLastNonCurrentUserMessage()`
- `jumpedMessageId()`
- `focusedMessageId()`
- `hasPresent()`
- `isReady()`
- `whenReady()`
- `isLoadingMessages()`
- `hasCurrentUserSentMessage()`
- `hasCurrentUserSentMessageSinceAppStart()`

---

### MobileWebSidebarStore

**Properties**

**Methods**
- `getIsOpen()`

---

### MultiAccountStore

**Properties**
- `canUseMultiAccountNotifications`
- `isSwitchingAccount`

**Methods**
- `initialize()`
- `getCanUseMultiAccountMobile()`
- `getState()`
- `getUsers()`
- `getValidUsers()`
- `getHasLoggedInAccounts()`
- `getIsValidatingUsers()`

---

### MyGuildApplicationsStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getGuildIdsForApplication()`
- `getLastFetchTimeMs()`
- `getNextFetchRetryTimeMs()`
- `getFetchState()`

---

### NativeScreenSharePickerStore

**Properties**

**Methods**
- `initialize()`
- `supported()`
- `enabled()`
- `releasePickerStream()`
- `getPickerState()`

---

### NetworkStore

**Properties**

**Methods**
- `initialize()`
- `getType()`
- `getEffectiveConnectionSpeed()`
- `getServiceProvider()`

---

### NewChannelsStore

**Properties**

**Methods**
- `initialize()`
- `getNewChannelIds()`
- `shouldIndicateNewChannel()`

---

### NewPaymentSourceStore

**Properties**
- `stripePaymentMethod`
- `popupCallbackCalled`
- `braintreeEmail`
- `braintreeNonce`
- `venmoUsername`
- `redirectedPaymentId`
- `adyenPaymentData`
- `redirectedPaymentSourceId`
- `isCardInfoValid`
- `isBillingAddressInfoValid`
- `error`

**Methods**
- `getCreditCardInfo()`
- `getBillingAddressInfo()`

---

### NewUserStore

**Properties**

**Methods**
- `initialize()`
- `getType()`
- `getState()`

---

### NewlyAddedEmojiStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getLastSeenEmojiByGuild()`
- `isNewerThanLastSeen()`

---

### NoteStore

**Properties**

**Methods**
- `getNote()`

---

### NoticeStore

**Properties**

**Methods**
- `initialize()`
- `hasNotice()`
- `getNotice()`
- `isNoticeDismissed()`

---

### NotificationCenterItemsStore

**Properties**
- `loading`
- `initialized`
- `items`
- `hasMore`
- `cursor`
- `errored`
- `active`
- `localItems`
- `tabFocused`

**Methods**
- `initialize()`
- `getState()`

---

### NotificationCenterStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getTab()`
- `isLocalItemAcked()`
- `hasNewMentions()`
- `isDataStale()`
- `isRefreshing()`
- `shouldReload()`

---

### NotificationSettingsStore

**Properties**
- `taskbarFlash`

**Methods**
- `initialize()`
- `getUserAgnosticState()`
- `getDesktopType()`
- `getTTSType()`
- `getDisabledSounds()`
- `getDisableAllSounds()`
- `getDisableUnreadBadge()`
- `getNotifyMessagesInSelectedChannel()`
- `isSoundDisabled()`

---

### NowPlayingStore

**Properties**
- `games`
- `usersPlaying`
- `gameIds`

**Methods**
- `initialize()`
- `getNowPlaying()`
- `getUserGame()`

---

### NowPlayingViewStore

**Properties**
- `currentActivityParties`
- `nowPlayingCards`
- `isMounted`
- `loaded`

**Methods**
- `initialize()`

---

### OverlayBridgeStore

**Properties**
- `enabled`
- `legacyEnabled`

**Methods**
- `initialize()`
- `isInputLocked()`
- `isSupported()`
- `getFocusedPID()`
- `isReady()`
- `isCrashed()`

---

### OverlayRTCConnectionStore

**Properties**

**Methods**
- `getConnectionState()`
- `getQuality()`
- `getHostname()`
- `getPings()`
- `getAveragePing()`
- `getLastPing()`
- `getOutboundLossRate()`

---

### OverlayRunningGameStore

**Properties**

**Methods**
- `getGameForPID()`
- `getGame()`

---

### OverlayStore

**Properties**
- `showKeybindIndicators`
- `initialized`
- `incompatibleApp`

**Methods**
- `initialize()`
- `getState()`
- `isLocked()`
- `isInstanceLocked()`
- `isInstanceFocused()`
- `isFocused()`
- `isPinned()`
- `getSelectedGuildId()`
- `getSelectedChannelId()`
- `getSelectedCallId()`
- `getDisplayUserMode()`
- `getDisplayNameMode()`
- `getAvatarSizeMode()`
- `getNotificationPositionMode()`
- `getTextChatNotificationMode()`
- `getDisableExternalLinkAlert()`
- `getFocusedPID()`
- `getActiveRegions()`
- `getTextWidgetOpacity()`
- `isPreviewingInGame()`

---

### OverlayStore-v3

**Properties**
- `enabled`
- `clickZoneDebugMode`
- `renderDebugMode`

**Methods**
- `initialize()`
- `isInputLocked()`
- `isSupported()`
- `isOverlayV3Enabled()`
- `getFocusedPID()`
- `isReady()`

---

### OverridePremiumTypeStore

**Properties**
- `premiumType`

**Methods**
- `initialize()`
- `getPremiumTypeOverride()`
- `getPremiumTypeActual()`
- `getCreatedAtOverride()`
- `getState()`

---

### PaymentAuthenticationStore

**Properties**
- `isAwaitingAuthentication`
- `error`
- `awaitingPaymentId`

**Methods**

---

### PaymentSourceStore

**Properties**
- `paymentSources`
- `paymentSourceIds`
- `defaultPaymentSourceId`
- `defaultPaymentSource`
- `hasFetchedPaymentSources`

**Methods**
- `getDefaultBillingCountryCode()`
- `getPaymentSource()`

---

### PaymentStore

**Properties**

**Methods**
- `getPayment()`
- `getPayments()`

---

### PendingReplyStore

**Properties**

**Methods**
- `initialize()`
- `getPendingReply()`
- `getPendingReplyActionSource()`

---

### PerksDemosStore

**Properties**

**Methods**
- `isAvailable()`
- `hasActiveDemo()`
- `hasActivated()`
- `shouldFetch()`
- `shouldActivate()`
- `overrides()`
- `activatedEndTime()`

---

### PerksDemosUIState

**Properties**

**Methods**
- `getState()`
- `shouldShowOptInPopout()`
- `initialize()`

---

### PerksRelevanceStore

**Properties**
- `hasFetchedRelevance`
- `profileThemesRelevanceExceeded`

**Methods**
- `initialize()`
- `getState()`

---

### PermissionSpeakStore

**Properties**

**Methods**
- `initialize()`
- `isAFKChannel()`
- `shouldShowWarning()`

---

### PermissionStore

**Properties**

**Methods**
- `initialize()`
- `getChannelPermissions()`
- `getGuildPermissions()`
- `getGuildPermissionProps()`
- `canAccessMemberSafetyPage()`
- `canAccessGuildSettings()`
- `canWithPartialContext()`
- `can()`
- `canBasicChannel()`
- `computePermissions()`
- `computeBasicPermissions()`
- `canManageUser()`
- `getHighestRole()`
- `isRoleHigher()`
- `canImpersonateRole()`
- `getGuildVersion()`
- `getChannelsVersion()`

---

### PermissionVADStore

**Properties**

**Methods**
- `initialize()`
- `shouldShowWarning()`
- `canUseVoiceActivity()`

---

### PhoneStore

**Properties**

**Methods**
- `initialize()`
- `getUserAgnosticState()`
- `getCountryCode()`

---

### PictureInPictureStore

**Properties**
- `pipWindow`
- `pipVideoWindow`
- `pipActivityWindow`
- `pipWindows`

**Methods**
- `initialize()`
- `pipWidth()`
- `isEmbeddedActivityHidden()`
- `getDockedRect()`
- `isOpen()`
- `getState()`

---

### PoggermodeAchievementStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getAllUnlockedAchievements()`
- `getUnlocked()`

---

### PoggermodeSettingsStore

**Properties**
- `settingsVisible`
- `shakeIntensity`
- `combosRequiredCount`
- `screenshakeEnabled`
- `screenshakeEnabledLocations`
- `combosEnabled`
- `comboSoundsEnabled`

**Methods**
- `initialize()`
- `getUserAgnosticState()`
- `isEnabled()`

---

### PoggermodeStore

**Properties**

**Methods**
- `initialize()`
- `getComboScore()`
- `getUserCombo()`
- `isComboing()`
- `getMessageCombo()`
- `getMostRecentMessageCombo()`
- `getUserComboShakeIntensity()`

---

### PopoutWindowStore

**Properties**

**Methods**
- `initialize()`
- `getWindow()`
- `getWindowState()`
- `getWindowKeys()`
- `getWindowOpen()`
- `getIsAlwaysOnTop()`
- `getWindowFocused()`
- `getWindowVisible()`
- `getState()`
- `unmountWindow()`

---

### PremiumGiftingIntentStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getFriendAnniversaries()`
- `isTopAffinityFriendAnniversary()`
- `canShowFriendsTabBadge()`
- `getFriendAnniversaryYears()`
- `isGiftIntentMessageInCooldown()`
- `getDevToolTotalFriendAnniversaries()`

---

### PremiumPaymentModalStore

**Properties**
- `paymentError`

**Methods**
- `getGiftCode()`

---

### PremiumPromoStore

**Properties**

**Methods**
- `initialize()`
- `isEligible()`

---

### PresenceStore

**Properties**

**Methods**
- `initialize()`
- `setCurrentUserOnConnectionOpen()`
- `getStatus()`
- `getActivities()`
- `getPrimaryActivity()`
- `getAllApplicationActivities()`
- `getApplicationActivity()`
- `findActivity()`
- `getActivityMetadata()`
- `getUserIds()`
- `isMobileOnline()`
- `getClientStatus()`
- `getState()`

---

### PrivateChannelReadStateStore

**Properties**

**Methods**
- `initialize()`
- `getUnreadPrivateChannelIds()`

---

### PrivateChannelRecipientsInviteStore

**Properties**

**Methods**
- `initialize()`
- `getResults()`
- `hasFriends()`
- `getSelectedUsers()`
- `getQuery()`
- `getState()`

---

### PrivateChannelSortStore

**Properties**

**Methods**
- `initialize()`
- `getPrivateChannelIds()`
- `getSortedChannels()`
- `serializeForOverlay()`

---

### ProfileEffectStore

**Properties**
- `isFetching`
- `fetchError`
- `profileEffects`
- `tryItOutId`

**Methods**
- `canFetch()`
- `hasFetched()`
- `getProfileEffectById()`

---

### PromotionsStore

**Properties**
- `outboundPromotions`
- `lastSeenOutboundPromotionStartDate`
- `lastDismissedOutboundPromotionStartDate`
- `lastFetchedActivePromotions`
- `isFetchingActiveOutboundPromotions`
- `hasFetchedConsumedInboundPromotionId`
- `consumedInboundPromotionId`
- `bogoPromotion`
- `isFetchingActiveBogoPromotion`
- `lastFetchedActiveBogoPromotion`

**Methods**
- `initialize()`
- `getState()`

---

### ProxyBlockStore

**Properties**
- `blockedByProxy`

**Methods**

---

### PurchaseTokenAuthStore

**Properties**
- `purchaseTokenAuthState`
- `purchaseTokenHash`
- `expiresAt`

**Methods**

---

### PurchasedItemsFestivityStore

**Properties**
- `canPlayWowMoment`
- `isFetchingWowMomentMedia`
- `wowMomentWumpusMedia`

**Methods**
- `initialize()`
- `getState()`

---

### QuestsStore

**Properties**
- `quests`
- `claimedQuests`
- `isFetchingCurrentQuests`
- `isFetchingClaimedQuests`
- `lastFetchedCurrentQuests`
- `questDeliveryOverride`
- `questToDeliverForPlacement`

**Methods**
- `isEnrolling()`
- `isClaimingReward()`
- `isFetchingRewardCode()`
- `isDismissingContent()`
- `getRewardCode()`
- `getRewards()`
- `getStreamHeartbeatFailure()`
- `getQuest()`
- `isProgressingOnDesktop()`
- `selectedTaskPlatform()`
- `getOptimisticProgress()`

---

### QuickSwitcherStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `isOpen()`
- `getResultTotals()`
- `channelNoticePredicate()`
- `getFrequentGuilds()`
- `getFrequentGuildsLength()`
- `getChannelHistory()`
- `getProps()`

---

### RTCConnectionDesyncStore

**Properties**
- `desyncedVoiceStatesCount`

**Methods**
- `initialize()`
- `getDesyncedUserIds()`
- `getDesyncedVoiceStates()`
- `getDesyncedParticipants()`

---

### RTCConnectionStore

**Properties**

**Methods**
- `initialize()`
- `getRTCConnection()`
- `getState()`
- `isConnected()`
- `isDisconnected()`
- `getRemoteDisconnectVoiceChannelId()`
- `getLastSessionVoiceChannelId()`
- `setLastSessionVoiceChannelId()`
- `getGuildId()`
- `getChannelId()`
- `getHostname()`
- `getQuality()`
- `getPings()`
- `getAveragePing()`
- `getLastPing()`
- `getOutboundLossRate()`
- `getMediaSessionId()`
- `getRTCConnectionId()`
- `getDuration()`
- `getPacketStats()`
- `getVoiceStateStats()`
- `getWasEverMultiParticipant()`
- `getWasEverRtcConnected()`
- `getUserIds()`
- `isUserConnected()`
- `getSecureFramesState()`
- `getSecureFramesRosterMapEntry()`

---

### RTCDebugStore

**Properties**

**Methods**
- `getSection()`
- `getStats()`
- `getInboundStats()`
- `getOutboundStats()`
- `getAllStats()`
- `getVideoStreams()`
- `shouldRecordNextConnection()`
- `getSimulcastDebugOverride()`

---

### RTCRegionStore

**Properties**

**Methods**
- `initialize()`
- `shouldIncludePreferredRegion()`
- `getPreferredRegion()`
- `getPreferredRegions()`
- `getRegion()`
- `getUserAgnosticState()`
- `shouldPerformLatencyTest()`

---

### ReadStateStore

**Properties**

**Methods**
- `initialize()`
- `getReadStatesByChannel()`
- `getForDebugging()`
- `getNotifCenterReadState()`
- `hasUnread()`
- `hasUnreadOrMentions()`
- `hasTrackedUnread()`
- `isForumPostUnread()`
- `getUnreadCount()`
- `getMentionCount()`
- `getGuildChannelUnreadState()`
- `hasRecentlyVisitedAndRead()`
- `ackMessageId()`
- `getTrackedAckMessageId()`
- `lastMessageId()`
- `lastMessageTimestamp()`
- `lastPinTimestamp()`
- `getOldestUnreadMessageId()`
- `getOldestUnreadTimestamp()`
- `isEstimated()`
- `hasOpenedThread()`
- `hasUnreadPins()`
- `isNewForumThread()`
- `getAllReadStates()`
- `getGuildUnreadsSentinel()`
- `getMentionChannelIds()`
- `getNonChannelAckId()`
- `getSnapshot()`

---

### RecentMentionsStore

**Properties**
- `hasLoadedEver`
- `lastLoaded`
- `loading`
- `hasMore`
- `guildFilter`
- `everyoneFilter`
- `roleFilter`
- `mentionsAreStale`
- `mentionCountByChannel`

**Methods**
- `initialize()`
- `isOpen()`
- `getMentions()`
- `hasMention()`
- `getMentionCountForChannel()`

---

### RecentVoiceChannelStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getChannelHistory()`

---

### RecentlyActiveCollapseStore

**Properties**

**Methods**
- `initialize()`
- `isCollapsed()`
- `getState()`

---

### ReferencedMessageStore

**Properties**

**Methods**
- `initialize()`
- `getMessageByReference()`
- `getMessage()`
- `getReplyIdsForChannel()`

---

### ReferralTrialStore

**Properties**

**Methods**
- `initialize()`
- `checkAndFetchReferralsRemaining()`
- `getReferralsRemaining()`
- `getSentUserIds()`
- `isFetchingReferralsRemaining()`
- `isFetchingRecipientEligibility()`
- `getRecipientEligibility()`
- `getRelevantUserTrialOffer()`
- `isResolving()`
- `getEligibleUsers()`
- `getFetchingEligibleUsers()`
- `getNextIndexOfEligibleUsers()`
- `getIsEligibleToSendReferrals()`
- `getRefreshAt()`
- `getRelevantReferralTrialOffers()`
- `getRecipientStatus()`
- `getIsSenderEligibleForIncentive()`
- `getIsSenderQualifiedForIncentive()`
- `getIsFetchingReferralIncentiveEligibility()`
- `getSenderIncentiveState()`

---

### RegionStore

**Properties**

**Methods**
- `initialize()`
- `getOptimalRegion()`
- `getOptimalRegionId()`
- `getRandomRegion()`
- `getRandomRegionId()`
- `getRegions()`

---

### RelationshipStore

**Properties**

**Methods**
- `initialize()`
- `isFriend()`
- `isBlockedOrIgnored()`
- `isBlockedOrIgnoredForMessage()`
- `isBlocked()`
- `isBlockedForMessage()`
- `isIgnored()`
- `isIgnoredForMessage()`
- `isUnfilteredPendingIncoming()`
- `getPendingCount()`
- `getSpamCount()`
- `getPendingIgnoredCount()`
- `getOutgoingCount()`
- `getFriendCount()`
- `getRelationshipCount()`
- `getRelationships()`
- `isSpam()`
- `getRelationshipType()`
- `getNickname()`
- `getSince()`
- `getSinces()`
- `getFriendIDs()`
- `getBlockedIDs()`
- `getIgnoredIDs()`
- `getBlockedOrIgnoredIDs()`

---

### RunningGameStore

**Properties**
- `canShowAdminWarning`

**Methods**
- `initialize()`
- `getVisibleGame()`
- `getCurrentGameForAnalytics()`
- `getVisibleRunningGames()`
- `getRunningGames()`
- `getRunningDiscordApplicationIds()`
- `getRunningVerifiedApplicationIds()`
- `getGameForPID()`
- `getLauncherForPID()`
- `getOverlayOptionsForPID()`
- `shouldElevateProcessForPID()`
- `shouldContinueWithoutElevatedProcessForPID()`
- `getCandidateGames()`
- `getGamesSeen()`
- `getSeenGameByName()`
- `isObservedAppRunning()`
- `getOverrides()`
- `getOverrideForGame()`
- `getGameOverlayStatus()`
- `getObservedAppNameForWindow()`
- `isDetectionEnabled()`
- `addExecutableTrackedByAnalytics()`

---

### SKUPaymentModalStore

**Properties**
- `isPurchasingSKU`
- `forceConfirmationStepOnMount`
- `error`
- `skuId`
- `applicationId`
- `analyticsLocation`
- `promotionId`
- `isIAP`
- `giftCode`
- `isGift`

**Methods**
- `getPricesForSku()`
- `isOpen()`
- `isFetchingSKU()`

---

### SKUStore

**Properties**

**Methods**
- `initialize()`
- `get()`
- `getForApplication()`
- `isFetching()`
- `getSKUs()`
- `getParentSKU()`
- `didFetchingSkuFail()`

---

### SafetyHubStore

**Properties**

**Methods**
- `isFetching()`
- `getClassifications()`
- `getClassification()`
- `getAccountStanding()`
- `getFetchError()`
- `isInitialized()`
- `getClassificationRequestState()`
- `getAppealClassificationId()`
- `getIsDsaEligible()`
- `getIsAppealEligible()`
- `getAppealEligibility()`
- `getAppealSignal()`
- `getFreeTextAppealReason()`
- `getIsSubmitting()`
- `getSubmitError()`
- `getUsername()`
- `getAgeVerificationWebviewUrl()`
- `getAgeVerificationError()`
- `getIsLoadingAgeVerification()`

---

### SaveableChannelsStore

**Properties**

**Methods**
- `initialize()`
- `loadCache()`
- `canEvictOrphans()`
- `saveLimit()`
- `getSaveableChannels()`
- `takeSnapshot()`

---

### SavedMessagesStore

**Properties**

**Methods**
- `initialize()`
- `getSavedMessages()`
- `getSavedMessage()`
- `getMessageBookmarks()`
- `getMessageReminders()`
- `getOverdueMessageReminderCount()`
- `hasOverdueReminder()`
- `getSavedMessageCount()`
- `getIsStale()`
- `getLastChanged()`
- `isMessageBookmarked()`
- `isMessageReminder()`

---

### SearchAutocompleteStore

**Properties**

**Methods**
- `initialize()`
- `getState()`

---

### SearchMessageStore

**Properties**

**Methods**
- `getMessage()`

---

### SearchStore

**Properties**

**Methods**
- `initialize()`
- `getCurrentSearchId()`
- `isActive()`
- `isTokenized()`
- `getSearchType()`
- `getRawResults()`
- `hasResults()`
- `isIndexing()`
- `isHistoricalIndexing()`
- `isSearching()`
- `getAnalyticsId()`
- `getResultsBlocked()`
- `getDocumentsIndexedCount()`
- `getSearchFetcher()`
- `getTotalResults()`
- `getEditorState()`
- `getHistory()`
- `getOffset()`
- `getQuery()`
- `hasError()`
- `shouldShowBlockedResults()`
- `shouldShowNoResultsAlt()`
- `getResultsState()`

---

### SecureFramesPersistedStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getPersistentCodesEnabled()`
- `getUploadedKeyVersionsCached()`

---

### SecureFramesVerifiedStore

**Properties**

**Methods**
- `initialize()`
- `isCallVerified()`
- `isStreamVerified()`
- `isUserVerified()`

---

### SelectedChannelStore

**Properties**

**Methods**
- `initialize()`
- `getChannelId()`
- `getVoiceChannelId()`
- `getMostRecentSelectedTextChannelId()`
- `getCurrentlySelectedChannelId()`
- `getLastSelectedChannelId()`
- `getLastSelectedChannels()`
- `getLastChannelFollowingDestination()`

---

### SelectedGuildStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getGuildId()`
- `getLastSelectedGuildId()`
- `getLastSelectedTimestamp()`

---

### SelectivelySyncedUserSettingsStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `shouldSync()`
- `getTextSettings()`
- `getAppearanceSettings()`

---

### SelfPresenceStore

**Properties**

**Methods**
- `initialize()`
- `getLocalPresence()`
- `getStatus()`
- `getActivities()`
- `getPrimaryActivity()`
- `getApplicationActivity()`
- `findActivity()`

---

### SendMessageOptionsStore

**Properties**

**Methods**
- `getOptions()`

---

### SessionsStore

**Properties**

**Methods**
- `initialize()`
- `getSessions()`
- `getSession()`
- `getRemoteActivities()`
- `getSessionById()`
- `getActiveSession()`

---

### SharedCanvasStore

**Properties**
- `visibleOverlayCanvas`

**Methods**
- `getDrawables()`
- `getAvatarImage()`
- `getEmojiImage()`
- `getDrawMode()`

---

### SignUpStore

**Properties**

**Methods**
- `getActiveUserSignUp()`
- `getActiveGuildSignUp()`
- `hasCompletedTarget()`

---

### SlowmodeStore

**Properties**

**Methods**
- `initialize()`
- `getSlowmodeCooldownGuess()`

---

### SortedGuildStore

**Properties**

**Methods**
- `initialize()`
- `getGuildsTree()`
- `getGuildFolders()`
- `getGuildFolderById()`
- `getFlattenedGuildIds()`
- `getFlattenedGuildFolderList()`
- `getCompatibleGuildFolders()`
- `getFastListGuildFolders()`
- `takeSnapshot()`

---

### SortedVoiceStateStore

**Properties**

**Methods**
- `initialize()`
- `getVoiceStates()`
- `getAllVoiceStates()`
- `getVoiceStatesForChannel()`
- `getVoiceStatesForChannelAlt()`
- `countVoiceStatesForChannel()`
- `getVoiceStateVersion()`

---

### SoundboardEventStore

**Properties**
- `playedSoundHistory`
- `recentlyHeardSoundIds`
- `frecentlyPlayedSounds`

**Methods**
- `initialize()`
- `getState()`
- `hasPendingUsage()`

---

### SoundboardStore

**Properties**

**Methods**
- `initialize()`
- `getOverlaySerializedState()`
- `getSounds()`
- `getSoundsForGuild()`
- `getSound()`
- `getSoundById()`
- `isFetchingSounds()`
- `isFetchingDefaultSounds()`
- `isFetching()`
- `shouldFetchDefaultSounds()`
- `hasFetchedDefaultSounds()`
- `isUserPlayingSounds()`
- `isPlayingSound()`
- `isFavoriteSound()`
- `getFavorites()`
- `isLocalSoundboardMuted()`
- `hasHadOtherUserPlaySoundInSession()`
- `hasFetchedAllSounds()`

---

### SoundpackStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getSoundpack()`
- `getLastSoundpackExperimentId()`

---

### SpamMessageRequestStore

**Properties**

**Methods**
- `initialize()`
- `loadCache()`
- `takeSnapshot()`
- `getSpamChannelIds()`
- `getSpamChannelsCount()`
- `isSpam()`
- `isAcceptedOptimistic()`
- `isReady()`

---

### SpeakingStore

**Properties**

**Methods**
- `initialize()`
- `getSpeakingDuration()`
- `getSpeakers()`
- `isSpeaking()`
- `isPrioritySpeaker()`
- `isSoundSharing()`
- `isAnyoneElseSpeaking()`
- `isCurrentUserSpeaking()`
- `isAnyonePrioritySpeaking()`
- `isCurrentUserPrioritySpeaking()`

---

### SpellcheckStore

**Properties**

**Methods**
- `initialize()`
- `isEnabled()`
- `hasLearnedWord()`

---

### SpotifyProtocolStore

**Properties**

**Methods**
- `isProtocolRegistered()`

---

### SpotifyStore

**Properties**

**Methods**
- `initialize()`
- `hasConnectedAccount()`
- `getActiveSocketAndDevice()`
- `getPlayableComputerDevices()`
- `canPlay()`
- `getSyncingWith()`
- `wasAutoPaused()`
- `getLastPlayedTrackId()`
- `getTrack()`
- `getPlayerState()`
- `shouldShowActivity()`
- `getActivity()`

---

### StageChannelParticipantStore

**Properties**

**Methods**
- `initialize()`
- `getParticipantsVersion()`
- `getMutableParticipants()`
- `getMutableRequestToSpeakParticipants()`
- `getRequestToSpeakParticipantsVersion()`
- `getParticipantCount()`
- `getChannels()`
- `getChannelsVersion()`
- `getParticipant()`

---

### StageChannelRoleStore

**Properties**

**Methods**
- `initialize()`
- `isSpeaker()`
- `isModerator()`
- `isAudienceMember()`
- `getPermissionsForUser()`

---

### StageChannelSelfRichPresenceStore

**Properties**

**Methods**
- `initialize()`
- `getActivity()`

---

### StageInstanceStore

**Properties**

**Methods**
- `getStageInstanceByChannel()`
- `isLive()`
- `isPublic()`
- `getStageInstancesByGuild()`
- `getAllStageInstances()`

---

### StageMusicStore

**Properties**

**Methods**
- `initialize()`
- `isMuted()`
- `shouldPlay()`
- `getUserAgnosticState()`

---

### StickerMessagePreviewStore

**Properties**

**Methods**
- `getStickerPreview()`

---

### StickersPersistedStore

**Properties**
- `stickerFrecencyWithoutFetchingLatest`

**Methods**
- `initialize()`
- `getState()`
- `hasPendingUsage()`

---

### StickersStore

**Properties**
- `isLoaded`
- `loadState`
- `stickerMetadata`
- `hasLoadedStickerPacks`
- `isFetchingStickerPacks`

**Methods**
- `initialize()`
- `getStickerById()`
- `getStickerPack()`
- `getPremiumPacks()`
- `isPremiumPack()`
- `getRawStickersByGuild()`
- `getAllStickersIterator()`
- `getAllGuildStickers()`
- `getStickersByGuildId()`

---

### StoreListingStore

**Properties**

**Methods**
- `initialize()`
- `get()`
- `getForSKU()`
- `getUnpublishedForSKU()`
- `getForChannel()`
- `isFetchingForSKU()`
- `getStoreListing()`

---

### StreamRTCConnectionStore

**Properties**

**Methods**
- `getActiveStreamKey()`
- `getRTCConnections()`
- `getAllActiveStreamKeys()`
- `getRTCConnection()`
- `getStatsHistory()`
- `getQuality()`
- `getMediaSessionId()`
- `getRtcConnectionId()`
- `getVideoStats()`
- `getHostname()`
- `getRegion()`
- `getMaxViewers()`
- `getStreamSourceId()`
- `getUserIds()`
- `isUserConnected()`
- `getSecureFramesState()`
- `getSecureFramesRosterMapEntry()`

---

### StreamerModeStore

**Properties**
- `enabled`
- `autoToggle`
- `hideInstantInvites`
- `hidePersonalInformation`
- `disableSounds`
- `disableNotifications`
- `enableContentProtection`

**Methods**
- `initialize()`
- `getState()`
- `getSettings()`

---

### StreamingCapabilitiesStore

**Properties**
- `GPUDriversOutdated`
- `canUseHardwareAcceleration`
- `problematicGPUDriver`

**Methods**
- `initialize()`
- `getState()`

---

### SubscriptionPlanStore

**Properties**

**Methods**
- `getPlanIdsForSkus()`
- `getFetchedSKUIDs()`
- `getForSKU()`
- `getForSkuAndInterval()`
- `get()`
- `isFetchingForSKU()`
- `isFetchingForSKUs()`
- `isLoadedForSKU()`
- `isLoadedForSKUs()`
- `isFetchingForPremiumSKUs()`
- `isLoadedForPremiumSKUs()`
- `ignoreSKUFetch()`
- `getPaymentSourcesForPlanId()`
- `getPaymentSourceIds()`
- `hasPaymentSourceForSKUId()`
- `hasPaymentSourceForSKUIds()`

---

### SubscriptionRemindersStore

**Properties**

**Methods**
- `shouldShowReactivateNotice()`

---

### SubscriptionRoleStore

**Properties**

**Methods**
- `initialize()`
- `getGuildIdsWithPurchasableRoles()`
- `buildRoles()`
- `getSubscriptionRoles()`
- `getPurchasableSubscriptionRoles()`
- `getUserSubscriptionRoles()`
- `getUserIsAdmin()`

---

### SubscriptionStore

**Properties**

**Methods**
- `hasFetchedSubscriptions()`
- `hasFetchedMostRecentPremiumTypeSubscription()`
- `hasFetchedPreviousPremiumTypeSubscription()`
- `getPremiumSubscription()`
- `getPremiumTypeSubscription()`
- `inReverseTrial()`
- `getSubscriptions()`
- `getSubscriptionById()`
- `getActiveGuildSubscriptions()`
- `getActiveApplicationSubscriptions()`
- `getSubscriptionForPlanIds()`
- `getMostRecentPremiumTypeSubscription()`
- `getPreviousPremiumTypeSubscription()`

---

### SummaryStore

**Properties**

**Methods**
- `getState()`
- `initialize()`
- `allSummaries()`
- `topSummaries()`
- `summaries()`
- `shouldShowTopicsBar()`
- `findSummary()`
- `selectedSummary()`
- `summaryFeedback()`
- `isFetching()`
- `status()`
- `shouldFetch()`
- `channelAffinities()`
- `channelAffinitiesById()`
- `channelAffinitiesStatus()`
- `shouldFetchChannelAffinities()`
- `defaultChannelIds()`
- `visibleSummaryIndex()`

---

### SurveyStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getCurrentSurvey()`
- `getSurveyOverride()`
- `getLastSeenTimestamp()`

---

### TTSStore

**Properties**
- `currentMessage`
- `speechRate`

**Methods**
- `initialize()`
- `isSpeakingMessage()`
- `getUserAgnosticState()`

---

### TenureRewardStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getFetchState()`
- `getTenureRewardStatusForRewardId()`

---

### TestModeStore

**Properties**
- `isTestMode`
- `isFetchingAuthorization`
- `testModeEmbeddedApplicationId`
- `testModeApplicationId`
- `testModeOriginURL`
- `error`

**Methods**
- `initialize()`
- `inTestModeForApplication()`
- `inTestModeForEmbeddedApplication()`
- `shouldDisplayTestMode()`
- `getState()`
- `whenInitialized()`

---

### ThemeStore

**Properties**
- `darkSidebar`
- `theme`
- `systemTheme`
- `systemPrefersColorScheme`
- `isSystemThemeAvailable`

**Methods**
- `initialize()`
- `getState()`

---

### ThreadMemberListStore

**Properties**

**Methods**
- `initialize()`
- `getMemberListVersion()`
- `getMemberListSections()`
- `canUserViewChannel()`

---

### ThreadMembersStore

**Properties**

**Methods**
- `initialize()`
- `getMemberCount()`
- `getMemberIdsPreview()`
- `getInitialOverlayState()`

---

### ThreadMessageStore

**Properties**

**Methods**
- `initialize()`
- `getCount()`
- `getMostRecentMessage()`
- `getChannelThreadsVersion()`
- `getInitialOverlayState()`

---

### TopEmojiStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getTopEmojiIdsByGuildId()`
- `getIsFetching()`

---

### TransientKeyStore

**Properties**

**Methods**
- `getUsers()`
- `isKeyVerified()`

---

### TutorialIndicatorStore

**Properties**

**Methods**
- `initialize()`
- `shouldShow()`
- `shouldShowAnyIndicators()`
- `getIndicators()`
- `getData()`
- `getDefinition()`

---

### TypingStore

**Properties**

**Methods**
- `getTypingUsers()`
- `isTyping()`

---

### UnreadSettingNoticeStore2

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getLastActionTime()`
- `maybeAutoUpgradeChannel()`

---

### UnsyncedUserSettingsStore

**Properties**
- `displayCompactAvatars`
- `lowQualityImageMode`
- `videoUploadQuality`
- `dataSavingMode`
- `expressionPickerWidth`
- `messageRequestSidebarWidth`
- `threadSidebarWidth`
- `postSidebarWidth`
- `callChatSidebarWidth`
- `homeSidebarWidth`
- `callHeaderHeight`
- `useSystemTheme`
- `activityPanelHeight`
- `disableVoiceChannelChangeAlert`
- `disableEmbeddedActivityPopOutAlert`
- `disableActivityHardwareAccelerationPrompt`
- `disableInviteWithTextChannelActivityLaunch`
- `disableHideSelfStreamAndVideoConfirmationAlert`
- `pushUpsellUserSettingsDismissed`
- `disableActivityHostLeftNitroUpsell`
- `disableCallUserConfirmationPrompt`
- `disableApplicationSubscriptionCancellationSurvey`
- `darkSidebar`
- `useMobileChatCustomRenderer`
- `saveCameraUploadsToDevice`
- `swipeToReply`
- `showPlayAgain`

**Methods**
- `initialize()`
- `getUserAgnosticState()`

---

### UpcomingEventNoticesStore

**Properties**

**Methods**
- `initialize()`
- `getGuildEventNoticeDismissalTime()`
- `getAllEventDismissals()`
- `getUpcomingNoticeSeenTime()`
- `getAllUpcomingNoticeSeenTimes()`
- `getState()`

---

### UploadAttachmentStore

**Properties**

**Methods**
- `getFirstUpload()`
- `hasAdditionalUploads()`
- `getUploads()`
- `getUploadCount()`
- `getUpload()`
- `findUpload()`

---

### UploadStore

**Properties**

**Methods**
- `initialize()`
- `getFiles()`
- `getMessageForFile()`
- `getUploaderFileForMessageId()`
- `getUploadAttachments()`

---

### UserAffinitiesStore

**Properties**

**Methods**
- `initialize()`
- `needsRefresh()`
- `getFetching()`
- `getState()`
- `getUserAffinities()`
- `getUserAffinitiesMap()`
- `getUserAffinity()`
- `getUserAffinitiesUserIds()`

---

### UserAffinitiesStoreV2

**Properties**

**Methods**
- `initialize()`
- `shouldFetch()`
- `isFetching()`
- `getUserAffinities()`
- `getUserAffinity()`
- `getState()`

---

### UserGuildJoinRequestStore

**Properties**
- `hasFetchedRequestToJoinGuilds`

**Methods**
- `getRequest()`
- `computeGuildIds()`
- `getJoinRequestGuild()`
- `hasJoinRequestCoackmark()`
- `getCooldown()`

---

### UserGuildSettingsStore

**Properties**
- `mentionOnAllMessages`
- `accountNotificationSettings`
- `useNewNotifications`

**Methods**
- `initialize()`
- `getState()`
- `isSuppressEveryoneEnabled()`
- `isSuppressRolesEnabled()`
- `isMuteScheduledEventsEnabled()`
- `isMobilePushEnabled()`
- `isMuted()`
- `isTemporarilyMuted()`
- `getMuteConfig()`
- `getMessageNotifications()`
- `getChannelOverrides()`
- `getNotifyHighlights()`
- `getGuildFlags()`
- `getChannelMessageNotifications()`
- `getChannelMuteConfig()`
- `getMutedChannels()`
- `isChannelMuted()`
- `isCategoryMuted()`
- `resolvedMessageNotifications()`
- `resolveUnreadSetting()`
- `isGuildOrCategoryOrChannelMuted()`
- `allowNoMessages()`
- `allowAllMessages()`
- `isGuildCollapsed()`
- `getAllSettings()`
- `getChannelIdFlags()`
- `getChannelFlags()`
- `getNewForumThreadsCreated()`
- `isOptInEnabled()`
- `isChannelRecordOrParentOptedIn()`
- `isChannelOrParentOptedIn()`
- `isChannelOptedIn()`
- `getOptedInChannels()`
- `getOptedInChannelsWithPendingUpdates()`
- `getPendingChannelUpdates()`
- `getGuildFavorites()`
- `isFavorite()`
- `isMessagesFavorite()`
- `isAddedToMessages()`
- `getAddedToMessages()`
- `getGuildUnreadSetting()`
- `resolveGuildUnreadSetting()`
- `getChannelRecordUnreadSetting()`
- `getChannelUnreadSetting()`

---

### UserLeaderboardStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getLastUpdateRequested()`

---

### UserOfferStore

**Properties**

**Methods**
- `initialize()`
- `getUserTrialOffer()`
- `getUserDiscountOffer()`
- `getAnyOfUserTrialOfferId()`
- `hasFetchedOffer()`
- `shouldFetchOffer()`
- `shouldFetchReferralOffer()`
- `shouldFetchAnnualOffer()`
- `getAlmostExpiringTrialOffers()`
- `getAcknowledgedOffers()`
- `getUnacknowledgedDiscountOffers()`
- `getUnacknowledgedOffers()`
- `hasAnyUnexpiredOffer()`
- `hasAnyUnexpiredDiscountOffer()`
- `getReferrer()`
- `getState()`
- `forceReset()`

---

### UserProfileStore

**Properties**
- `isSubmitting`

**Methods**
- `initialize()`
- `isFetchingProfile()`
- `isFetchingFriends()`
- `getUserProfile()`
- `getGuildMemberProfile()`
- `getMutualFriends()`
- `getMutualFriendsCount()`
- `getMutualGuilds()`
- `takeSnapshot()`

---

### UserRequiredActionStore

**Properties**

**Methods**
- `hasAction()`
- `getAction()`

---

### UserSettingsAccountStore

**Properties**

**Methods**
- `getFormState()`
- `getErrors()`
- `showNotice()`
- `getIsSubmitDisabled()`
- `getPendingAvatar()`
- `getPendingGlobalName()`
- `getPendingBanner()`
- `getPendingBio()`
- `getPendingPronouns()`
- `getPendingAccentColor()`
- `getPendingThemeColors()`
- `getPendingAvatarDecoration()`
- `getPendingProfileEffectId()`
- `getAllPending()`
- `getTryItOutThemeColors()`
- `getTryItOutAvatar()`
- `getTryItOutAvatarDecoration()`
- `getTryItOutProfileEffectId()`
- `getTryItOutBanner()`
- `getAllTryItOut()`

---

### UserSettingsModalStore

**Properties**
- `onClose`

**Methods**
- `initialize()`
- `hasChanges()`
- `isOpen()`
- `getPreviousSection()`
- `getSection()`
- `getSubsection()`
- `getScrollPosition()`
- `shouldOpenWithoutBackstack()`
- `getProps()`

---

### UserSettingsOverridesStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getAppliedOverrideReasonKey()`
- `getOverride()`

---

### UserSettingsProtoStore

**Properties**
- `settings`
- `frecencyWithoutFetchingLatest`
- `wasMostRecentUpdateFromServer`

**Methods**
- `initialize()`
- `getState()`
- `computeState()`
- `hasLoaded()`
- `getFullState()`
- `getGuildFolders()`
- `getGuildRecentsDismissedAt()`
- `getDismissedGuildContent()`
- `getGuildsProto()`

---

### UserStore

**Properties**

**Methods**
- `initialize()`
- `takeSnapshot()`
- `handleLoadCache()`
- `getUserStoreVersion()`
- `getUser()`
- `getUsers()`
- `forEach()`
- `findByTag()`
- `filter()`
- `getCurrentUser()`

---

### VerifiedKeyStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `getKeyTrustedAt()`
- `isKeyVerified()`
- `getUserIds()`
- `getUserVerifiedKeys()`

---

### VideoBackgroundStore

**Properties**
- `videoFilterAssets`
- `hasBeenApplied`
- `hasUsedBackgroundInCall`

**Methods**
- `initialize()`

---

### VideoQualityModeStore

**Properties**
- `mode`

**Methods**

---

### VideoSpeakerStore

**Properties**

**Methods**
- `initialize()`
- `getSpeaker()`

---

### VideoStreamStore

**Properties**

**Methods**
- `getStreamId()`
- `getUserStreamData()`

---

### ViewHistoryStore

**Properties**

**Methods**
- `initialize()`
- `getState()`
- `hasViewed()`

---

### VirtualCurrencyStore

**Properties**
- `error`
- `isRedeeming`
- `redeemingSkuId`
- `entitlements`

**Methods**
- `handleRedeemVirtualCurrencyStart()`
- `handleRedeemVirtualCurrencySuccess()`
- `handleRedeemVirtualCurrencyFail()`

---

### VoiceChannelEffectsPersistedStore

**Properties**

**Methods**
- `initialize()`
- `getState()`

---

### VoiceChannelEffectsStore

**Properties**
- `recentlyUsedEmojis`
- `isOnCooldown`
- `effectCooldownEndTime`

**Methods**
- `getEffectForUserId()`

---

### VoiceStateStore

**Properties**
- `userHasBeenMovedVersion`

**Methods**
- `getAllVoiceStates()`
- `getVoiceStateVersion()`
- `getVoiceStates()`
- `getVoiceStatesForChannel()`
- `getVideoVoiceStatesForChannel()`
- `getVoiceState()`
- `getDiscoverableVoiceState()`
- `getVoiceStateForChannel()`
- `getVoiceStateForUser()`
- `getDiscoverableVoiceStateForUser()`
- `getVoiceStateForSession()`
- `getUserVoiceChannelId()`
- `getCurrentClientVoiceChannelId()`
- `getUsersWithVideo()`
- `isCurrentClientInVoiceChannel()`
- `isInChannel()`
- `hasVideo()`
- `getVoicePlatformForChannel()`

---

### WebAuthnStore

**Properties**
- `hasCredentials`

**Methods**
- `hasFetchedCredentials()`
- `getCredentials()`

---

### WebhooksStore

**Properties**
- `error`

**Methods**
- `isFetching()`
- `getWebhooksForGuild()`
- `getWebhooksForChannel()`

---

### WelcomeScreenStore

**Properties**

**Methods**
- `get()`
- `isFetching()`
- `hasError()`
- `hasSeen()`
- `isEmpty()`

---

### WindowStore

**Properties**

**Methods**
- `isFocused()`
- `isVisible()`
- `getFocusedWindowId()`
- `getLastFocusedWindowId()`
- `isElementFullScreen()`
- `windowSize()`
