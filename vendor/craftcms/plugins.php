<?php

$vendorDir = dirname(__DIR__);
$rootDir = dirname(dirname(__DIR__));

return array (
  'superbig/craft3-mobiledetect' => 
  array (
    'class' => 'superbig\\mobiledetect\\MobileDetect',
    'basePath' => $vendorDir . '/superbig/craft3-mobiledetect/src',
    'handle' => 'mobile-detect',
    'aliases' => 
    array (
      '@superbig/mobiledetect' => $vendorDir . '/superbig/craft3-mobiledetect/src',
    ),
    'name' => 'MobileDetect',
    'version' => '1.0.2',
    'schemaVersion' => '1.0.0',
    'description' => 'Use Mobile_Detect for detecting mobile devices (including tablets)',
    'developer' => 'Superbig',
    'developerUrl' => 'https://superbig.co',
    'documentationUrl' => 'https://github.com/sjelfull/craft3-mobiledetect/blob/master/README.md',
    'changelogUrl' => 'https://raw.githubusercontent.com/sjelfull/craft3-mobiledetect/master/CHANGELOG.md',
    'hasCpSettings' => false,
    'hasCpSection' => false,
    'components' => 
    array (
      'mobileDetectService' => 'superbig\\mobiledetect\\services\\MobileDetectService',
    ),
  ),
  'craftcms/redactor' => 
  array (
    'class' => 'craft\\redactor\\Plugin',
    'basePath' => $vendorDir . '/craftcms/redactor/src',
    'handle' => 'redactor',
    'aliases' => 
    array (
      '@craft/redactor' => $vendorDir . '/craftcms/redactor/src',
    ),
    'name' => 'Redactor',
    'version' => '2.10.10',
    'description' => 'Edit rich text content in Craft CMS using Redactor by Imperavi.',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'developerEmail' => 'support@craftcms.com',
    'documentationUrl' => 'https://github.com/craftcms/redactor/blob/v2/README.md',
  ),
);
