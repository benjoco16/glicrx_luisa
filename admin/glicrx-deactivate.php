<?php
    // Delete database table on deactivation
    function glic_deactivate() {
      global $wpdb;
      $table_name = $wpdb->prefix . 'glicrx_st';
      $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
    }
    
?>