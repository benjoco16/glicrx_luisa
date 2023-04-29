<?php
    function glic_activate() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'glicrx_st';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "CREATE TABLE $table_name (
        id INT NOT NULL AUTO_INCREMENT,
        token VARCHAR(255) NOT NULL,
        PRIMARY KEY  (id)
        ) $charset_collate;";
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta( $sql );
    }
?>
