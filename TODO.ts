/**
 * @todo List of current ideas to add and features that need to be added.
 * 
 * 
 * @summary1 Still need to implement better cascade delete system on the rabbitmq consumer server. Logic is all hard coded and not 
 * scalable as of right now. Need to make it not only scalable but also handle multiple tables dynamically as well. AI recommendations seem good
 * however logic is complex and creates a single point of failure for every single deletion action in the application. Maybe find a best of both words?
 * 
 * 
 * @summary2 Implement user deletion action. User should be able to view their profile with the groups they are in along with user settings.
 * 
 * 
 * @summary3 Implement group member removal function for group owners. Currently members cannot be kicked from groups.
 * 
 * 
 * @summary4 Implement better system for organizing group hierarchy in database. While the current system is... fine, added features may
 * require more complex logic for implementing soft delete cascades. Maybe implement some custom SQL logic? Con: The logic would be extensive for
 * multiple tables. Would probably have to separate the logic into individual functions.
 * 
 * 
 * @summary5 Figure out a way to implement a pnpm workspace database and schema library. Tried once before however it broke Sveltekit completely and
 * caused me to waste 10 hours.
 * 
 * 
 * @summary6 Make the UI feel more modern. Currently the UI is fine however some of it can be modernized and more intuitive. For instance creating a group
 * or task and then immediately navigating to that page is a little unintuitive.
 * 
 * 
 * @summary7 Still need to add soft delete cascade for other deletion actions, currently the soft cascade delete is only for groups which are at the top level.
 * Groups > Group + Group Members > Task > Task + Task Assignee
 * 
 * 
 * @summary8 Add a group statistics feature. Group members should be able to see statistics about task completions.
 */