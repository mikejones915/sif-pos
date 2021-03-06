<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit7dad674229df376c5b00622e1ef45315
{
    public static $classMap = array (
        'Query' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query.php',
        'Query_src\\Config' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Config.php',
        'Query_src\\Delete' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Delete.php',
        'Query_src\\Get' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Get.php',
        'Query_src\\Insert' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Insert.php',
        'Query_src\\Language' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Language.php',
        'Query_src\\Pagination' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Pagination.php',
        'Query_src\\Replace' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Replace.php',
        'Query_src\\Reserved' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Reserved.php',
        'Query_src\\Run' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Run.php',
        'Query_src\\Update' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Update.php',
        'Query_src\\Where' => __DIR__ . '/..' . '/offboard/Class-Query/lib/Query_src/Where.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit7dad674229df376c5b00622e1ef45315::$classMap;

        }, null, ClassLoader::class);
    }
}
