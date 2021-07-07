<?php

return [
    '*' => [
        'indexSidebarLimit' => 25,
        'indexSidebarGroup' => true,
        'indexSidebarIndividualElements' => false,
        'defaultQueryStatus' => ['approved'],

        // General
        'allowGuest' => true,
        'guestNotice' => '',
        'guestRequireEmailName' => true,
        'guestShowEmailName' => true,
        'requireModeration' => true,
        'moderatorUserGroup',
        'autoCloseDays' => '',
        'maxReplyDepth' => '',
        'maxUserComments' => '',

        // Voting
        'allowVoting' => true,
        'allowGuestVoting' => false,
        'downvoteCommentLimit' => 5,
        'hideVotingForThreshold' => false,

        // Flagging
        'allowFlagging' => true,
        'allowGuestFlagging' => false,
        'flaggedCommentLimit' => 5,

        // Templates - Default
        'showAvatar' => true,
        'placeholderAvatar' => '',
        'showTimeAgo' => true,
        'outputDefaultCss' => true,
        'outputDefaultJs' => true,

        // Templates - Custom
        'templateFolderOverride' => '',
        'templateEmail' => '',

        // Security
        'enableSpamChecks' => true,
        'securityMaxLength' => '',
        'securityFlooding' => '',
        'securityModeration' => '',
        'securitySpamlist' => '',
        'securityBanned' => '',
        'securityMatchExact' => false,
        'recaptchaEnabled' => false,
        'recaptchaKey' => '',
        'recaptchaSecret' => '',

        // Notifications
        'notificationAuthorEnabled' => true,
        'notificationReplyEnabled' => true,
        'notificationSubscribeAuto' => false,
        'notificationSubscribeDefault' => true,
        'notificationSubscribeEnabled' => false,
        'notificationSubscribeCommentEnabled' => false,
        'notificationModeratorEnabled' => false,
        'notificationModeratorApprovedEnabled' => false,
        'notificationAdmins' => [],
        'notificationAdminEnabled' => false,
        'notificationFlaggedEnabled' => false,

        // Permissions
        'permissions' => [],

        // Custom Fields
        'showCustomFieldNames' => false,
        'showCustomFieldInstructions' => false,
    ]
];
