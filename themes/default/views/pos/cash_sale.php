<?php
(defined('BASEPATH')) OR exit('No direct script access allowed');
require realpath(__DIR__) . '/../../../../vendor/autoload.php';
$suspend = '';
if (!empty($_GET['hold'])) {
    $suspend = Func::array_table('tec_suspended_sales', array("id" => $_GET['hold']));
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title><?= $page_title . ' | ' . $Settings->site_name; ?></title>
        <link rel="shortcut icon" href="<?= $assets ?>images/icon.png"/>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link href="<?= $assets ?>bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>plugins/iCheck/square/green.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>plugins/select2/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />
        

        <link href="<?= $assets ?>plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>plugins/redactor/redactor.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>dist/css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo  $assets ?>plugins/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css" rel="stylesheet" type="text/css" />

        <link href="<?= $assets ?>dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= $assets ?>dist/css/custom.css" rel="stylesheet" type="text/css" />      
        <link rel="stylesheet" type="text/css" href="<?= $assets ?>dist/css/slick.css">
        <link rel="stylesheet" type="text/css" href="<?= $assets ?>dist/css/slick-theme.css">
        <link rel="stylesheet" type="text/css" href="<?= $assets ?>dist/css/slick-theme.css">

        <script src="<?= $assets ?>plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
        <script src="<?= $assets ?>dist/js/slick.js" type="text/javascript" charset="utf-8"></script>

    </head>
    <style>
    #posTable tr{background-color: #d9edf7    }
   
.bootstrap-datetimepicker-widget{
    color:#000 !important;
}
</style>
    <body class="skin-green sidebar-collapse sidebar-mini pos">
        <div class="wrapper">

            <header class="main-header">
                <a href="<?= site_url(); ?>" class="logo">
                    <span class="logo-mini">SIF POS</span>
                    <span class="logo-lg"><?= $Settings->site_name == 'SIF POS' ? '<b>POS</b>' : '<img src="' . base_url('uploads/' . $Settings->logo) . '" alt="' . $Settings->site_name . '" />'; ?></span>
                </a>
                <nav class="navbar navbar-static-top" role="navigation">
                    <ul class="nav navbar-nav pull-left">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="<?= $assets; ?>images/<?= $Settings->language; ?>.png" alt="<?= $Settings->language; ?>"></a>
                            <ul class="dropdown-menu">
                                <?php
                                $scanned_lang_dir = array_map(function ($path) {
                                    return basename($path);
                                }, glob(APPPATH . 'language/*', GLOB_ONLYDIR));
                                foreach ($scanned_lang_dir as $entry) {
                                    ?>
                                    <li><a href="<?= site_url('pos/language/' . $entry); ?>"><img
                                                src="<?= $assets; ?>images/<?= $entry; ?>.png"
                                                class="language-img"> &nbsp;&nbsp;<?= ucwords($entry); ?></a></li>
                                    <?php } ?>
                            </ul>
                        </li>
                    </ul>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li><a target="_blank"><?= $Settings->CompanyName; ?></a></li>
                            <li><a href="<?= site_url(); ?>"><i class="fa fa-dashboard"></i></a></li>
                            <?php if ($Admin) { ?>
                                <li><a href="<?= site_url('settings'); ?>"><i class="fa fa-cogs"></i></a></li>
                            <?php } ?>
                           
                             
                                <li id="view_bill2"><a href="<?= site_url('pos/view_bill2'); ?>"target="_blank"><i class="fa fa-file-text-o"></i></a></li>
                            
                            <li><a href="<?= site_url('pos/shortcuts'); ?>" data-toggle="ajax"><i class="fa fa-key"></i></a></li>
                  <!--          <li><a href="<?= site_url('pos/register_details'); ?>" data-toggle="ajax"><?= lang('register_details'); ?></a></li>-->
                  <?php if ($Admin) { ?>
                            <li id="_monthly_sales"><a href="<?= site_url('reports/monthly_sales'); ?>" >Vendas Mensais</a></li>

                            
                                <li><a href="<?= site_url('reports/daily_sales'); ?>">Vendas Diária</a></li>

                                 <!--<li><a href="<?= site_url('pos/today_sale'); ?>" data-toggle="ajax"><?= lang('today_sale'); ?></a></li>-->

                            <?php } ?>
                             
                             <li><a href="<?= site_url('pos/close_register'); ?>" data-toggle="ajax"><?= lang('close_register'); ?></a></li> 
                            <?php if ($suspended_sales) { ?>
                                <li class="dropdown notifications-menu">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                        <i class="fa fa-bell-o"></i>
                                        <span class="label label-warning"><?= sizeof($suspended_sales); ?></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="header"><?= lang('recent_suspended_sales'); ?></li>
                                        <li>
                                            <ul class="menu">
                                                <li>
                                                    <?php
                                                    $id = !empty($_GET["hold"]) ? $_GET["hold"] : NULL;
                                                    foreach ($suspended_sales as $ss) {
                                                        echo '<a href="' . site_url('pos?hold=' . $ss->id) . '" class="load_suspended">' . $this->tec->hrld($ss->date) . ' (' . $ss->customer_name . ')<br><strong>' . $ss->hold_ref . '</strong></a>';
														echo '<a href="' . site_url('ajuntar.php?mesa=' . $ss->hold_ref ). '" class="load_suspended">' . '<br><strong>' . Ajuntar . '</strong></a>';
                                                    }
                                                    ?>
                                                   
                                                    
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="footer"><a href="ajuntar.php"><?= lang('view_all'); ?></a></li>
                                    </ul>
                                </li>
                            <?php } ?>
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="<?= base_url('uploads/avatars/thumbs/' . ($this->session->userdata('avatar') ? $this->session->userdata('avatar') : $this->session->userdata('gender') . '.png')) ?>" class="user-image" alt="Avatar" />
                                    <span><?= $this->session->userdata('first_name') . ' ' . $this->session->userdata('last_name'); ?></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="user-header">
                                        <img src="<?= base_url('uploads/avatars/' . ($this->session->userdata('avatar') ? $this->session->userdata('avatar') : $this->session->userdata('gender') . '.png')) ?>" class="img-circle" alt="Avatar" />
                                        <p>
                                            <?= $this->session->userdata('email'); ?>
                                            <small><?= lang('member_since') . ' ' . $this->session->userdata('created_on'); ?></small>
                                        </p>
                                    </li>
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="<?= site_url('users/profile/' . $this->session->userdata('user_id')); ?>" class="btn btn-default btn-flat"><?= lang('profile'); ?></a>
                                        </div>
                                        <div class="pull-right">
                                            <a href="<?= site_url('logout'); ?>" class="btn btn-default btn-flat"><?= lang('sing_out'); ?></a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" data-toggle="control-sidebar" class="sidebar-icon"><i class="fa fa-folder sidebar-icon"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

           <aside class="main-sidebar">
                <section class="sidebar">
                    <ul class="sidebar-menu">
                        <li class="header"><?= lang('mian_navigation'); ?></li>

                        <li id="mm_welcome"><a href="<?= site_url(); ?>"><i class="fa fa-dashboard"></i> <span><?= lang('dashboard'); ?></span></a></li>
                        <li class="treeview mm_pos">
                            <a href="#">
                                <i class="fa fa-th"></i>
                                <span><?php echo  lang('Gestão de Vendas'); ?></span>
                                <i class="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul class="treeview-menu">
                                <li id="pos1">
                                    <a href="<?php echo  site_url('pos'); ?>"><i class="fa fa-circle-o"></i> <span><?php echo  lang('pos'); ?></span></a>
                                </li>
                              
                                 <li id="cash_sale">
                                    <a href="<?php echo  site_url('pos/cash_sale'); ?>"><i class="fa fa-circle-o"></i> <span><?php echo  lang('invoice'); ?></span></a>
                                </li>
                                <!-- <li id="invoice">
                                    <a href="<?php echo  site_url('pos/invoice'); ?>"><i class="fa fa-circle-o"></i> <span><?php echo  lang('invoice'); ?></span></a>
                                </li>
                                <li id="pro_forma">
                                    <a href="<?php echo  site_url('pos/pro_forma'); ?>"><i class="fa fa-circle-o"></i> <span><?php echo  lang('pro-forma'); ?></span></a>
                                </li> -->
                            </ul>
                           <!--  <a href="<?php echo  site_url('pos'); ?>"><i class="fa fa-th"></i> <span><?php echo  lang('pos'); ?></span></a> -->
                        </li>


                        <?php if ($Admin) { ?>
                            <li class="treeview" id="mm_products">
                                <a href="#">
                                    <i class="fa fa-barcode"></i>
                                    <span><?= lang('products'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="products_index"><a href="<?= site_url('products'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_products'); ?></a></li>
                                    <li id="products_itens"><a href="<?= site_url('products/itens'); ?>"><i class="fa fa-circle-o"></i> Listar Subitem</a></li>
                                    <li id="products_add"><a href="<?= site_url('products/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_product'); ?></a></li>
                                    <li id="products_add_itens"><a href="<?= site_url('products/add_itens'); ?>"><i class="fa fa-circle-o"></i> Adicionar Item Produto</a></li>
                                    <li id="products_import_csv"><a href="<?= site_url('products/import'); ?>"><i class="fa fa-circle-o"></i> <?= lang('import_products'); ?></a></li>
                                    <li id="products_print_barcodes"><a onclick="window.open('<?= site_url('products/print_barcodes'); ?>', 'pos_popup', 'width=900,height=600,menubar=yes,scrollbars=yes,status=no,resizable=yes,screenx=0,screeny=0'); return false;"
                                                                        href="#"><i class="fa fa-circle-o"></i> <?= lang('print_barcodes'); ?></a></li>
                                    <li id="products_print_labels"><a onclick="window.open('<?= site_url('products/print_labels'); ?>', 'pos_popup', 'width=900,height=600,menubar=yes,scrollbars=yes,status=no,resizable=yes,screenx=0,screeny=0'); return false;"
                                                                      href="#"><i class="fa fa-circle-o"></i> <?= lang('print_labels'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview" id="mm_categories">
                                <a href="#">
                                    <i class="fa fa-folder"></i>
                                    <span><?= lang('categories'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="categories_index"><a href="<?= site_url('categories'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_categories'); ?></a></li>
                                    <li id="categories_add"><a href="<?= site_url('categories/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_category'); ?></a></li>
                                    <li id="categories_import"><a href="<?= site_url('categories/import'); ?>"><i class="fa fa-circle-o"></i> <?= lang('import_categories'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview" id="mm_sales">
                                <a href="#">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span><?= lang('sales'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="sales_index"><a href="<?= site_url('sales'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_sales'); ?></a></li>
                                     <li id="sales_index" class="<?php if($this->router->fetch_method() == "pro_forma") echo "active"; ?>"><a href="<?php echo  site_url('sales/pro_forma'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('pro_forma_list'); ?></a></li> 

                                    <li id="invoice_lists" class="<?php if($this->router->fetch_method() == "invoice_lists") echo "active"; ?>"><a href="<?php echo  site_url('sales/invoice_lists'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('invoice_lists'); ?></a></li>

                                    <li id="sales_opened"><a href="<?= site_url('sales/opened'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_opened_bills'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview mm_purchases">
                                <a href="#">
                                    <i class="fa fa-plus"></i>
                                    <span><?= lang('purchases'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="purchases_index"><a href="<?= site_url('purchases'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_purchases'); ?></a></li>
                                    <li id="purchases_add"><a href="<?= site_url('purchases/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_purchase'); ?></a></li>
                                    <li class="divider"></li>
                                    <li id="purchases_expenses"><a href="<?= site_url('purchases/expenses'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_expenses'); ?></a></li>
                                    <li id="purchases_add_expense"><a href="<?= site_url('purchases/add_expense'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_expense'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview" id="mm_gift_cards">
                                <a href="#">
                                    <i class="fa fa-credit-card"></i>
                                    <span><?= lang('gift_cards'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="gift_cards_index"><a href="<?= site_url('gift_cards'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_gift_cards'); ?></a></li>
                                    <li id="gift_cards_add"><a href="<?= site_url('gift_cards/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_gift_card'); ?></a></li>
                                </ul>
                            </li>

                            <li class="treeview mm_auth mm_customers mm_suppliers">
                                <a href="#">
                                    <i class="fa fa-users"></i>
                                    <span><?= lang('people'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="auth_users"><a href="<?= site_url('users'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_users'); ?></a></li>
                                    <li id="auth_add"><a href="<?= site_url('users/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_user'); ?></a></li>
                                    <li class="divider"></li>
                                    <li id="customers_index"><a href="<?= site_url('customers'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_customers'); ?></a></li>
                                    <li id="customers_add"><a href="<?= site_url('customers/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_customer'); ?></a></li>
                                    <li class="divider"></li>
                                    <li id="suppliers_index"><a href="<?= site_url('suppliers'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_suppliers'); ?></a></li>
                                    <li id="suppliers_add"><a href="<?= site_url('suppliers/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_supplier'); ?></a></li>
                                </ul>
                            </li>

                            <li class="treeview" id="mm_settings">
                                <a href="#">
                                    <i class="fa fa-cogs"></i>
                                    <span><?= lang('settings'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                   <?php 
                                        if($this->Super_admin){
                                        ?>
                                        <li id="settings_index"><a href="<?php echo  site_url('settings'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('settings'); ?></a></li>
                                        
                                        <li id="settings_xsd" class="<?php if($this->router->fetch_method() == "generate_licence") echo "active"; ?>"><a href="<?php echo  site_url('settings/generate_licence'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('generate_licence'); ?></a></li>

                                        <li id="settings_public" class="<?php if($this->router->fetch_method() == "sign_keys") echo "active"; ?>"><a href="<?php echo  site_url('settings/sign_keys'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('sign_keys'); ?></a></li>

                                        <?php                                 
                                            }
                                        ?>
                                    <li id="settings_xsd" class="<?php if($this->router->fetch_method() == "saf_xsd") echo "active"; ?>"><a href="<?php echo  site_url('settings/saf_xsd'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('SAF-AO XSD'); ?></a></li>
                                    <li id="settings_mesa"><a href="<?= site_url('settings/mesa'); ?>"><i class="fa fa-bars"></i> Mesas</a></li>
                                    <li id="settings_backups"><a href="<?= site_url('settings/backups'); ?>"><i class="fa fa-circle-o"></i> <?= lang('backups'); ?></a></li>
                                    <li id="settings_updates"><a href="<?= site_url('settings/updates'); ?>"><i class="fa fa-circle-o"></i> <?= lang('updates'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview" id="mm_reports">
                                <a href="#">
                                    <i class="fa fa-bar-chart-o"></i>
                                    <span><?= lang('reports'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="reports_daily_sales"><a href="<?= site_url('reports/daily_sales'); ?>"><i class="fa fa-circle-o"></i> <?= lang('daily_sales'); ?></a></li>
                                    <li id="reports_monthly_sales"><a href="<?= site_url('reports/monthly_sales'); ?>"><i class="fa fa-circle-o"></i> <?= lang('monthly_sales'); ?></a></li>
                                    <li id="reports_index"><a href="<?= site_url('reports'); ?>"><i class="fa fa-circle-o"></i> <?= lang('sales_report'); ?></a></li>
                                     <li id="reports_invoice" class="<?php if($this->router->fetch_method() == "invoices") echo "active"; ?>"><a href="<?php echo  site_url('reports/invoices'); ?>"><i class="fa fa-circle-o"></i> <?php echo  lang('invoice_report'); ?></a></li>
                                    <li class="divider"></li>
                                    <li id="reports_payments"><a href="<?= site_url('reports/payments'); ?>"><i class="fa fa-circle-o"></i> <?= lang('payments_report'); ?></a></li>
                                    <li class="divider"></li>
                                    <li id="reports_registers"><a href="<?= site_url('reports/registers'); ?>"><i class="fa fa-circle-o"></i> <?= lang('registers_report'); ?></a></li>
                                    <li class="divider"></li>
                                    <li id="reports_top_products"><a href="<?= site_url('reports/top_products'); ?>"><i class="fa fa-circle-o"></i> <?= lang('top_products'); ?></a></li>
                                    <li id="reports_products"><a href="<?= site_url('reports/products'); ?>"><i class="fa fa-circle-o"></i> <?= lang('products_report'); ?></a></li>
                                </ul>
                            </li>
                        <?php } else { ?>
                            <li id="mm_products"><a href="<?= site_url('products'); ?>"><i class="fa fa-barcode"></i> <span><?= lang('products'); ?></span></a></li>
                            <li id="mm_categories"><a href="<?= site_url('categories'); ?>"><i class="fa fa-folder-open"></i> <span><?= lang('categories'); ?></span></a></li>
                            <li class="treeview" id="mm_sales">
                                <a href="#">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span><?= lang('sales'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="sales_index"><a href="<?= site_url('sales'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_sales'); ?></a></li>
                                    <li id="sales_opened"><a href="<?= site_url('sales/opened'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_opened_bills'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview mm_purchases">
                                <a href="#">
                                    <i class="fa fa-plus"></i>
                                    <span><?= lang('expenses'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="purchases_expenses"><a href="<?= site_url('purchases/expenses'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_expenses'); ?></a></li>
                                    <li id="purchases_add_expense"><a href="<?= site_url('purchases/add_expense'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_expense'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview" id="mm_gift_cards">
                                <a href="#">
                                    <i class="fa fa-credit-card"></i>
                                    <span><?= lang('gift_cards'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="gift_cards_index"><a href="<?= site_url('gift_cards'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_gift_cards'); ?></a></li>
                                    <li id="gift_cards_add"><a href="<?= site_url('gift_cards/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_gift_card'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview" id="mm_customers">
                                <a href="#">
                                    <i class="fa fa-users"></i>
                                    <span><?= lang('customers'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="customers_index"><a href="<?= site_url('customers'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_customers'); ?></a></li>
                                    <li id="customers_add"><a href="<?= site_url('customers/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_customer'); ?></a></li>
                                </ul>
                            </li>
                            <li class="treeview mm_suppliers">
                                <a href="#">
                                    <i class="fa fa-users"></i>
                                    <span><?= lang('suppliers'); ?></span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <li id="suppliers_index"><a href="<?= site_url('suppliers'); ?>"><i class="fa fa-circle-o"></i> <?= lang('list_suppliers'); ?></a></li>
                                    <li id="suppliers_add"><a href="<?= site_url('suppliers/add'); ?>"><i class="fa fa-circle-o"></i> <?= lang('add_supplier'); ?></a></li>
                                </ul>
                            </li>
                        <?php } ?>
                    </ul>
                </section>
            </aside>

            <div class="content-wrapper">

                <div class="col-lg-12 alerts">
                    <?php if ($error) { ?>
                        <div class="alert alert-danger alert-dismissable">
                            <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                            <h4><i class="icon fa fa-ban"></i> <?= lang('error'); ?></h4>
                            <?= $error; ?>
                        </div>
                    <?php } if ($message) { ?>
                        <div class="alert alert-success alert-dismissable">
                            <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                            <h4><i class="icon fa fa-check"></i> <?= lang('Success'); ?></h4>
                            <?= $message; ?>
                        </div>
                    <?php } ?>
                </div>

                <div id="box_left" style="width: 100%;">

                    <div id="pos">
                        <?= form_open('pos/cash_sale', 'id="pos-sale-form"'); ?>
                        <div class="well well-sm" id="leftdiv">
                            <div id="lefttop" style="margin-bottom: 22px;border-bottom: 1px solid #808080;padding-bottom: 5px;">
                                <div class="row">
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group" style="margin-bottom:3px;">
                                            <select id="invoice_type"  name="invoice_type" class="form-control type select2" style="width:100%;">
                                                <?php
                                                    if(!$this->Staff){ 
                                                ?>
                                                <option value="FT"><?= lang("invoice")?></option>
                                                <?php } ?>
                                                <option value="FP"><?= lang("pro-forma")?></option>
                                                <option value="FR"><?= lang("invoice_receipt")?></option>
                                                
                                                <!--<option value="VD"><?= lang("cash_sale")?></option>-->
                                            </select>
                                        </div>

                                        <div class="form-group" style="margin-bottom:3px;">
                                            <input type="text" name="code" id="add_item" class="form-control" placeholder="<?= lang('search__scan') ?>" />
                                        </div> 

                                    </div>
                                    <style type="text/css">
                                        .field-title{
                                            color: white;
                                            text-align: right;
                                            padding-top: 6px;
                                            font-weight: bold;
                                            padding-right: 0px;
                                        }
                                    </style>
                                    <div class="col-md-8 col-sm-12">
                                        <div class="row">
                                            <div class="col-md-6 col-sm-12">
                                                <div class="row">
                                                    <div class="col-md-2 col-sm-2 col-xs-12 field-title"><?=lang("customers")?> : </div>
                                                    <div class="col-md-10 col-sm-10 col-xs-12">
                                                        <div class="input-group" style="margin-bottom:3px; width: 100%;">
                                                            <?php
                                                            foreach ($customers as $customer) {
                                                                $cus[$customer->id] = $customer->name ;
                                                                // $cus[$customer->id] = $customer->name . ' | ' . $customer->phone . ' | ' . $customer->cf2 . ' | ' . $customer->endereco . ' ' . $customer->numero . ' ' . $customer->bairro;
                                                            }
                                                            ?>
                                                            <!-- <?= form_dropdown('customer_id', $cus, set_value('customer_id', $Settings->default_customer), 'id="spos_customer" data-placeholder="' . lang("select") . ' ' . lang("customer") . '" required="required"  class="form-control select2" style="width:calc(100% - 35px);"'); ?> -->
                                                            <select name="customer_id" id="spos_customer" data-placeholder="Selecione Cliente" required="required" class="form-control select2" style="width:calc(100% - 34px);">
                                                            <?php
                                                                foreach ($customers as $customer) {
                                                                    $cus[$customer->id] = $customer->name ;
                                                                    $cus_1 = $customer->name . ' | ' . $customer->phone . ' | ' . $customer->cf1 . ' | ' . $customer->endereco . ' ' . $customer->numero . ' ' . $customer->bairro;
                                                                    if($cus[$customer->id] == $Settings->default_customer)
                                                                        echo '<option value="'.$customer->id.'" data-customer_info="'.$cus_1.'" selected>'.$customer->name.'</option>';
                                                                    else 
                                                                        echo '<option value="'.$customer->id.'" data-customer_info="'.$cus_1.'">'.$customer->name.'</option>';

                                                                    // $cus[$customer->id] = $customer->name . ' | ' . $customer->phone . ' | ' . $customer->cf2 . ' | ' . $customer->endereco . ' ' . $customer->numero . ' ' . $customer->bairro;
                                                                }
                                                            ?>
                                                            </select><div class="input-group-addon no-print" style="padding: 2px 5px;display: inline-block;width: 34px;">
                                                                <a href="#" id="add-customer" class="external" data-toggle="modal" data-target="#myModal"><i class="fa fa-2x fa-plus-circle" id="addIcon"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <div class="row">
                                                    <div class="col-md-2 col-sm-2 col-xs-12 field-title"><?=lang("phone")?>:</div>

                                                    <div class="col-md-10 col-sm-10 col-xs-12">
                                                        <div class="form-group" style="margin-bottom:3px;">
                                                            <input type="text" name="tele_phone" id="tele_phone" class="form-control" value="<?php echo $customers[0]->phone; ?>" />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <div class="row">
                                                    <div class="col-md-2 col-sm-2 col-xs-12 field-title"><?=lang("Morada")?>:</div>
                                                    <div class="col-md-10 col-sm-10 col-xs-12">
                                                        <div class="form-group" style="margin-bottom:3px;">
                                                            <input type="text" name="address" id="address" class="address_input form-control" value="<?php echo  $customers[0]->bairro; ?>"/>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <div class="row">
                                                    <div class="col-md-2 col-sm-2 col-xs-12 field-title"><?=lang("TaxRegistrationNumber")?>:</div>
                                                    <div class="col-md-10 col-sm-10 col-xs-12">
                                                        <div class="form-group" style="margin-bottom:3px;">
                                                            <input type="text" name="phone2" id="phone2" class="form-control" value="<?php echo $customers[0]->cf1; ?>" />
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12" style="display: none;">
                                        <div class="form-group" style="margin-bottom:3px;">
                                            <div class="input-group" style="width: 100%">
                                                <select name="mesa" class="form-control" id="select_mesa" style="display: none;">
                                                    <option value="no"<?php echo empty($suspend) && empty($suspend["mesa"]) ? ' selected=""' : ''; ?>>-- Selecione a Mesa--</option>
                                                    <?php
                                                    $q = new Query();
                                                    $q
                                                            ->select()
                                                            ->from("tec_mesas");
                                                    if (!isset($_GET["hold"])) {
                                                        $q->where_equal_to(
                                                                array(
                                                                    "status" <= 0
                                                                )
                                                        );
                                                    }
                                                    $q
                                                            ->order_by("name ASC")
                                                            ->run();
                                                    foreach ($q->get_selected() as $k => $mesa):
                                                        ?>
                                                        <?php if (!empty($suspend["mesa"])): ?>
                                                            <option data-mesa="<?php echo $mesa["name"]; ?>" value="<?php echo $mesa["id"]; ?>"<?= $suspend["hold_ref"] === $mesa["name"] ? ' selected=""' : ''; ?>><?php echo $mesa["name"]; ?></option>
                                                        <?php endif; ?> 
                                                        <?php if (empty($suspend["mesa"])): ?>
                                                            <option data-mesa="<?php echo $mesa["name"]; ?>" value="<?php echo $mesa["id"]; ?>"><?php echo $mesa["name"]; ?></option>
                                                        <?php endif; ?>
                                                    <?php endforeach; ?>
                                                </select>
                                                <div id="select_mesa_show" class="form-control">
                                                    <?php 
                                                        if(!empty($suspend["mesa"])) echo $suspend["hold_ref"];
                                                    ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                
                            </div>
                            <div id="printhead" class="print">
                                <?= $Settings->header; ?>
                                <p>Date: <?= date($Settings->dateformat) ?></p>
                            </div>
                            <style type="text/css">
                                #list-table-div{
                                        height: calc(100vh - 315px);
                                }
                                .address_input{
                                     width: calc(100% - 5px);
                                }
                                @media(max-width: 1024px ){
                                    #spos_customer{
                                        width: calc(100% - 35px) !important;
                                    }
                                    .field-title{
                                        text-align: left !important;
                                    }
                                    #list-table-div{
                                        height: calc(100vh - 375px);
                                    }
                                    .address_input{
                                        width: 100%;
                                    }
                                }
                                @media(max-width: 770px ){
                                    #spos_customer{
                                        width: calc(100% - 35px) !important;
                                    }
                                    .field-title{
                                        text-align: left !important;
                                    }
                                    #list-table-div{
                                        height: calc(100vh - 560px);
                                    }
                                    .address_input{
                                        width: 100%;
                                    }
                                }
                            </style>
                            <div id="print">
                                <div id="list-table-div" style="border-bottom: 1px solid #808080; margin-bottom: 10px;">
                                    <table id="posTable" class="table table-striped table-condensed table-hover list-table" style="margin:0;">
                                        <thead>
                                            <tr class="success">
                                                <th style="width: 10%;text-align: left;"><?= lang('code') ?></th>
                                                <th><?= lang('product') ?></th>
                                                <th style="width: 10%;text-align:right;"><?= lang('price') ?></th>
                                                <th style="width: 10%;text-align: center;"><?= lang('order_tax') ?></th>
                                                <th style="width: 10%;text-align:center;"><?= lang('qty') ?></th>
                                                <th style="text-align: left; text-align: center;"><?= lang('discount') ?></th>
                                                <th style="width: 10%;text-align:right;"><?= lang('subtotal') ?></th>
                                                <th style="width: 20px;" class="satu"><i class="fa fa-trash-o"></i></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 col-xs-12">
                                        <div id="totaldiv">
                                                <table id="totaltbl" class="table table-condensed totals" style="margin-bottom:10px;">
                                                    <tbody>
                                                        <tr class="info">
                                                            <td width="25%"><span><?= lang('total_items') ?> : </span> <span id="count">0</span></td>
                                                            <td width="25%"style="text-align: center; ">
                                                                <span><?= lang('discount') ?> : </span>
                                                                <span id="ds_con">0</span>
                                                            </td>
                                                            <td width="25%" style="text-align: center;">
                                                                <span>
                                                                    <?= lang('order_tax') ?>
                                                                </span>
                                                                <span id="ts_con">0</span>
                                                            </td>
                                                            <td width="25%" class="text-right">
                                                                <span><?= lang('total') ?></span>
                                                                <span id="total">0</span>
                                                            </td>
                                                        </tr>
 
                                                        <tr class="success">
                                                            <td colspan="2" style="font-weight:bold; font-size: 24px;"><?= lang('total_payable') ?></td>
                                                            <td class="text-right" colspan="2" style="font-weight:bold; font-size: 24px;">
                                                                <span id="total-payable">0</span>
                                                            </td>
                                                        </tr> 
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
                                    <div class="col-md-8 col-xs-12">
                                         <div id="botbuttons" class="col-xs-12 text-center">
                                            <div class="row">
                                                <div class="col-md-offset-1 col-md-2 col-sm-4 col-xs-6">
                                                    <div class="btn-group-vertical btn-block">
                                                        <button style="height: 80px;" type="button" class="btn btn-warning btn-block btn-flat" data-mesa="1"
                                                                id="suspend"><i class="fa fa-save"></i> <span style="display: inline-flex;vertical-align: unset;"><?= lang('hold'); ?></span></button>
                                                               
                                                    </div>

                                                </div>
                                                <div class="col-md-2 col-sm-4 col-xs-6" >
                                                    <div class="btn-group-vertical btn-block">
                                                        <?php if ($garson) { ?>
                                                        
                                                        <?php } else { ?> <button style="height: 80px;" type="button" class="btn btn-danger btn-block btn-flat"
                                                        id="reset"><i class="fa fa-ban"></i> <span style="display: inline-flex;vertical-align: unset;"><?= lang('cancel'); ?></span> </button>
                                                        <?php } ?>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-sm-4 col-xs-6" >
                                                    <div class="btn-group-vertical btn-block">
                                                          <button style="height: 80px;background: #5195c0;border-color: #004080;" class="btn btn-danger btn-block btn-flat" id="add_discount"><i class="fa fa-gift"></i> <span style="display: inline-flex;vertical-align: unset;"><?= lang('discount') ?></span> </button>
                                                      </div>
                                                </div>
                                                <div class="col-md-2 col-sm-4 col-xs-6" >
                                                    <div class="btn-group-vertical btn-block">
                                                          <button type="button" style="height: 80px;background: #5195c0;border-color: #004080;" class="btn btn-danger btn-block btn-flat" id="add_auto_print"><i class="fa fa-file-pdf-o"></i> <span style="display: inline-flex;vertical-align: unset;"><?= lang('payment') ?><br><?= lang('automatic') ?><br></span> </button>
                                                      </div>
                                                </div>
                                                <?php if ($garson) { ?>
                                                <?php } else { ?> 
                                                <div class="col-md-2 col-sm-4 col-xs-6">
                                                    <button style="height: 80px;" type="button" class="btn btn-success btn-block btn-flat" id="<?= $eid ? 'submit-sale' : 'payment'; ?>"> <i class="fa fa-exchange"></i> <span style="display: inline-flex;vertical-align: unset;"> <?= $eid ? lang('submit') : lang('payment'); ?></span></button>
                                                </div>
                                                <?php } ?>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                
                           
                            <div class="clearfix"></div>
                            <span id="hidesuspend"></span>
                            <input type="hidden" name="spos_note" value="" id="spos_note">

                            <div id="payment-con">
                                <input type="hidden" name="amount" id="amount_val" value="<?= $eid ? $sale->paid : ''; ?>"/>
                                <input type="hidden" name="balance_amount" id="balance_val" value=""/>
                                <input type="hidden" name="paid_by" id="paid_by_val" value="cash"/>
                                <input type="hidden" name="cc_no" id="cc_no_val" value=""/>
                                <input type="hidden" name="paying_gift_card_no" id="paying_gift_card_no_val" value=""/>
                                <input type="hidden" name="cc_holder" id="cc_holder_val" value=""/>
                                <input type="hidden" name="cheque_no" id="cheque_no_val" value=""/>
                                <input type="hidden" name="cc_month" id="cc_month_val" value=""/>
                                <input type="hidden" name="cc_year" id="cc_year_val" value=""/>
                                <input type="hidden" name="cc_type" id="cc_type_val" value=""/>
                                <input type="hidden" name="cc_cvv2" id="cc_cvv2_val" value=""/>
                                <input type="hidden" name="payment_note" id="payment_note_val" value=""/>
                            </div>
                            <input type="hidden" name="balance" id="balance_val" value="" />   
                            <input type="hidden" name="customer" id="customer" value="<?= $Settings->default_customer ?>" />
                            <input type="hidden" name="order_tax" id="tax_val" value="" />
                            <input type="hidden" name="order_discount" id="discount_val" value="" />
                            <input type="hidden" name="count" id="total_item" value="" />
                            <input type="hidden" name="did" id="is_delete" value="<?= $sid; ?>" />
                            <input type="hidden" name="eid" id="is_delete" value="<?= $eid; ?>" />
                            <input type="hidden" name="hold_ref" id="hold_ref" value="" />
                            <input type="hidden" name="total_items" id="total_items" value="0" />
                            <input type="hidden" name="total_quantity" id="total_quantity" value="0" />
                            <input type="submit" id="submit" value="Submit Sale" style="display: none;" />
                        </div>
                        <?= form_close(); ?>
                    </div>

                </div>
            </div>
        </div>

        <!-- <aside class="control-sidebar control-sidebar-dark" id="categories-list">
            <div class="tab-content">
                <div class="tab-pane active" id="control-sidebar-home-tab">
                    <ul class="control-sidebar-menu">
                        <?php
                        foreach ($categories as $category) {
                            echo '<li><a href="#" class="category' . ($category->id == $Settings->default_category ? ' active' : '') . '" id="' . $category->id . '">';
                            if ($category->image) {
                                echo '<div class="menu-icon"><img src="' . base_url('uploads/thumbs/' . $category->image) . '" alt="" class="img-thumbnail img-circle img-responsive"></div>';
                            } else {
                                echo '<i class="menu-icon fa fa-folder-open bg-red"></i>';
                            }
                            echo '<div class="menu-info"><h4 class="control-sidebar-subheading">' . $category->code . '</h4><p>' . $category->name . '</p></div>
							</a></li>';
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </aside> -->
        <div class="control-sidebar-bg"></div>
    </div>
</div>
<div id="order_tbl" style="display:none;"><span id="order_span"></span>
    <table id="order-table" class="prT table table-striped table-condensed" style="width:100%;margin-bottom:0;"></table>
</div>
<div id="bill_tbl" style="display:none;"><span id="bill_span"></span>
    <table id="bill-table" width="100%" class="prT table table-striped table-condensed" style="width:100%;margin-bottom:0;"></table>
    <table id="bill-total-table" width="100%" class="prT table table-striped table-condensed" style="width:100%;margin-bottom:0;"></table>
</div>

<div class="modal" data-easein="flipYIn" id="posModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
<div class="modal" data-easein="flipYIn" id="posModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true"></div>
<div id="ajaxCall"><i class="fa fa-spinner fa-pulse"></i></div>

<div class="modal" data-easein="flipYIn" id="gcModal" tabindex="-1" role="dialog" aria-labelledby="mModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="myModalLabel"><?= lang('sell_gift_card'); ?></h4>
            </div>
            <div class="modal-body">
                <p><?= lang('enter_info'); ?></p>

                <div class="alert alert-danger gcerror-con" style="display: none;">
                    <button data-dismiss="alert" class="close" type="button">×</button>
                    <span id="gcerror"></span>
                </div>
                <div class="form-group">
                    <?= lang("card_no", "gccard_no"); ?> *
                    <div class="input-group">
                        <?php echo form_input('gccard_no', '', 'class="form-control" id="gccard_no"'); ?>
                        <div class="input-group-addon" style="padding-left: 10px; padding-right: 10px;"><a href="#" id="genNo"><i class="fa fa-cogs"></i></a></div>
                    </div>
                </div>
                <input type="hidden" name="gcname" value="<?= lang('gift_card') ?>" id="gcname"/>
                <div class="form-group">
                    <?= lang("value", "gcvalue"); ?> *
                    <?php echo form_input('gcvalue', '', 'class="form-control" id="gcvalue"'); ?>
                </div>
                <div class="form-group">
                    <?= lang("price", "gcprice"); ?> *
                    <?php echo form_input('gcprice', '', 'class="form-control" id="gcprice"'); ?>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal"><?= lang('close') ?></button>
                <button type="button" id="addGiftCard" class="btn btn-primary"><?= lang('sell_gift_card') ?></button>
            </div>
        </div>
    </div>
</div>
<div class="modal" data-easein="flipYIn" id="subitemModal" tabindex="-1" role="dialog" aria-labelledby="dsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="dsModalLabel">Sub Itens </h4>
            </div>
            <div class="modal-body">
                <table class="table table-hover table-condensed">
                    <thead>
                        <tr class="success">
                            <th>Subitem</th>
                            <th style="width: 15%;text-align:center;">Preço</th>
                            <th style="width: 15%;text-align:center;">Adicionar</th>
                        </tr>
                    </thead>
                    <tbody id="listingDatasubitem"></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm pull-left" data-dismiss="modal"><?= lang('close') ?></button>
            </div>
        </div>
    </div>
</div>
<div class="modal" data-easein="flipYIn" id="dsModal" tabindex="-1" role="dialog" aria-labelledby="dsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="dsModalLabel"><?= lang('discount_title'); ?></h4>
            </div>
            <div class="modal-body">
                <input type='text' class='form-control input-sm kb-pad' id='get_ds' onClick='this.select();' value=''>

                <label class="checkbox" for="apply_to_order">
                    <input type="radio" name="apply_to" value="order" id="apply_to_order" checked="checked"/>
                    <?= lang('apply_to_order') ?>
                </label>
                <label class="checkbox" for="apply_to_products">
                    <input type="radio" name="apply_to" value="products" id="apply_to_products"/>
                    <?= lang('apply_to_products') ?>
                </label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm pull-left" data-dismiss="modal"><?= lang('close') ?></button>
                <button type="button" id="updateDiscount" class="btn btn-primary btn-sm"><?= lang('update') ?></button>
            </div>
        </div>
    </div>
</div>

<div class="modal" data-easein="flipYIn" id="tsModal" tabindex="-1" role="dialog" aria-labelledby="tsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="tsModalLabel"><?= lang('tax_title'); ?></h4>
            </div>
            <div class="modal-body">
                <input type='text' class='form-control input-sm kb-pad' id='get_ts' onClick='this.select();' value=''>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm pull-left" data-dismiss="modal"><?= lang('close') ?></button>
                <button type="button" id="updateTax" class="btn btn-primary btn-sm"><?= lang('update') ?></button>
            </div>
        </div>
    </div>
</div>

<div class="modal" data-easein="flipYIn" id="proModal" tabindex="-1" role="dialog" aria-labelledby="proModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header modal-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="proModalLabel">
                    <?= lang('payment') ?> 
                </h4>
            </div>
            <div class="modal-body">
                <table class="table table-bordered table-striped">
                    <tr>
                        <th style="width:25%;"><?= lang('net_price'); ?></th>
                        <th style="width:25%;"><span id="net_price"></span></th>
                        <th style="width:25%;"><?= lang('product_tax'); ?></th>
                        <th style="width:25%;"><span id="pro_tax"></span> <span id="pro_tax_method"></span></th>
                    </tr>
                </table>
                <input type="hidden" id="row_id" />
                <input type="hidden" id="item_id" />
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <?= lang('unit_price', 'nPrice') ?>
                            <input type="text" class="form-control input-sm kb-pad" id="nPrice" onClick="this.select();" placeholder="<?= lang('new_price') ?>">
                        </div>
                        <div class="form-group">
                            <?= lang('discount', 'nDiscount') ?>
                            <input type="text" class="form-control input-sm kb-pad" id="nDiscount" onClick="this.select();" placeholder="<?= lang('discount') ?>">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <?= lang('quantity', 'nQuantity') ?>
                            <input type="text" class="form-control input-sm kb-pad" id="nQuantity" onClick="this.select();" placeholder="<?= lang('current_quantity') ?>">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal"><?= lang('close') ?></button>
                <button class="btn btn-success" id="editItem"><?= lang('update') ?></button>
            </div>
        </div>
    </div>
</div>

<div class="modal" data-easein="flipYIn" id="susModal" tabindex="-1" role="dialog" aria-labelledby="susModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="susModalLabel"><?= lang('suspend_sale'); ?></h4>
            </div>
            <div class="modal-body">
                <p><?= lang('type_reference_note'); ?></p>

                <div class="form-group">
                    <?= lang("reference_note", "reference_note"); ?>
                    <?php echo form_input('reference_note', $reference_note, 'class="form-control kb-text" id="reference_note"'); ?>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal"> <?= lang('close') ?> </button>
                <button type="button" id="suspend_sale" class="btn btn-primary"> <?= lang('submit') ?></button>
            </div>
        </div>
    </div>
</div>



<div class="modal" data-easein="flipYIn" id="saleModal" tabindex="-1" role="dialog" aria-labelledby="saleModalLabel" aria-hidden="true"></div>
<div class="modal" data-easein="flipYIn" id="opModal" tabindex="-1" role="dialog" aria-labelledby="opModalLabel" aria-hidden="true"></div>

<div class="modal" data-easein="flipYIn" id="payModal" tabindex="-1" role="dialog" aria-labelledby="payModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-success">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="payModalLabel">
                    <?= lang('payment') ?> 
                </h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-9 for-ft">
                        <div class="font16">
                            <table class="table table-bordered table-condensed" style="margin-bottom: 0;">
                                <tbody>
                                    <tr>
                                        <td width="25%" style="border-right-color: #FFF !important;"><?= lang("total_items"); ?></td>
                                        <td width="25%" class="text-right"><span id="item_count">0.00</span></td>
                                        <td width="25%" style="border-right-color: #FFF !important;"><?= lang("total_payable"); ?></td>
                                        <td width="25%" class="text-right"><span id="twt">0.00</span></td>
                                    </tr>
                                    <tr>
                                        <td style="border-right-color: #FFF !important;"><?= lang("total_paying"); ?></td>
                                        <td class="text-right"><span id="total_paying">0.00</span></td>
                                        <td style="border-right-color: #FFF !important;"><?= lang("balance"); ?></td>
                                        <td class="text-right"><span id="balance">0.00</span></td>
                                    </tr>
									<div >
                                    <?= lang('note', 'note'); ?>
                                    <textarea  name="note"  class="form-control "  id="note" style=" height:100px;"></textarea>
                                </div>
									 
                                </tbody>
                            </table>
                            <div class="clearfix"></div>
                        </div>
                        <div class="row for-none-ft">
                            
							
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <?= lang("amount", "amount"); ?>
                                    <input name="amount[]" type="text" required="required"
                                           class="pa form-control kb-pad amount" value="<?php echo $amount ?>"  id="amount"/>
                                </div>
                                <div id="amount_error">
                                    
                                </div>
                            </div>
							<div class="col-xs-6">
                                <div class="col-xs-12">
                                <div class="form-group">
                                    <?= lang("paying_by", "paid_by"); ?>
                                    <select id="paid_by" class="form-control paid_by select2" style="width:100%;">
                                        <option value="cash"><?= lang("cash"); ?></option>
                                         <option value="CC"><?= lang("cc"); ?></option>
                                        <option value="Cheque">cartao</option>
                                        <option value="gift_card"><?= lang("gift_card"); ?></option>

                                    </select>
                                </div>
                            </div>
                            </div>
                            <div class="col-xs-4 hidden">
                                <div class="form-group">
                                    <label for="vbalance">Valor Balança</label>
                                    <input name="balance" type="text" required="required"
                                           class="pa form-control kb-pad amount" id="vbalance" value="0"/>
                                </div>
                            </div>
                          
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group gc" style="display: none;">
                                    <?= lang("gift_card_no", "gift_card_no"); ?>
                                    <input type="text" id="gift_card_no"
                                           class="pa form-control kb-pad gift_card_no gift_card_input"/>

                                    <div id="gc_details"></div>
                                </div>
                                <div class="pcc" style="display:none;">
                                    <div class="form-group">
                                        <input type="text" id="swipe" class="form-control swipe swipe_input"
                                               placeholder="<?= lang('focus_swipe_here') ?>"/>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <div class="form-group">
                                                <input type="text" id="pcc_no"
                                                       class="form-control kb-pad"
                                                       placeholder="<?= lang('cc_no') ?>"/>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <div class="form-group">

                                                <input type="text" id="pcc_holder"
                                                       class="form-control kb-text"
                                                       placeholder="<?= lang('cc_holder') ?>"/>
                                            </div>
                                        </div>
                                        <div class="col-xs-3">
                                            <div class="form-group">
                                                <select id="pcc_type"
                                                        class="form-control pcc_type select2"
                                                        placeholder="<?= lang('card_type') ?>">
                                                    <option value="Visa"><?= lang("Visa"); ?></option>
                                                    <option
                                                        value="MasterCard"><?= lang("MasterCard"); ?></option>
                                                    <option value="Amex"><?= lang("Amex"); ?></option>
                                                    <option
                                                        value="Discover"><?= lang("Discover"); ?></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xs-3">
                                            <div class="form-group">
                                                <input type="text" id="pcc_month"
                                                       class="form-control kb-pad"
                                                       placeholder="<?= lang('month') ?>"/>
                                            </div>
                                        </div>
                                        <div class="col-xs-3">
                                            <div class="form-group">

                                                <input type="text" id="pcc_year"
                                                       class="form-control kb-pad"
                                                       placeholder="<?= lang('year') ?>"/>
                                            </div>
                                        </div>
                                        <div class="col-xs-3">
                                            <div class="form-group">

                                                <input type="text" id="pcc_cvv2"
                                                       class="form-control kb-pad"
                                                       placeholder="<?= lang('cvv2') ?>"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pcheque" style="display:none;">
                                    <div class="form-group"><label for="cheque_no">Cartão N°</label>      
                                        <input type="text" id="cheque_no"
                                               class="form-control cheque_no  kb-text"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-3 text-center for-none-ft">
                            <!-- <span style="font-size: 1.2em; font-weight: bold;"><?= lang('quick_cash'); ?></span> -->

                        <div class="btn-group btn-group-vertical" style="width:100%;">
                            <button type="button" data-amount="0" class="btn btn-info btn-block quick-cash" id="quick-payable">0.00
                            </button>
                            <?php
                            foreach (lang('quick_cash_notes') as $cash_note_amount) {
                                echo '<button type="button" data-amount="'.$cash_note_amount.'" class="btn btn-block btn-warning quick-cash">' . $cash_note_amount . '</button>';
                            }
                            ?>
                            <button type="button" class="btn btn-block btn-danger"
                                    id="clear-cash-notes"><?= lang('clear'); ?></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal"> <?= lang('close') ?> </button>
                <button class="btn btn-primary" id="<?= $eid ? '' : 'submit-sale'; ?>"><?= lang('submit') ?></button>
            </div>
        </div>
    </div>
</div>


<div class="modal" data-easein="flipYIn" id="customerModal" tabindex="-1" role="dialog" aria-labelledby="cModalLabel" aria-hidden="true">
    <div class="modal-dialog"> 
        <div class="modal-content">
            <div class="modal-header modal-primary">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-remove"></i></button>
                <h4 class="modal-title" id="cModalLabel">
                    <?= lang('add_customer') ?>
                </h4>
            </div>
            <?= form_open('pos/add_customer', 'id="customer-form"'); ?>
            <div class="modal-body">
                <div id="c-alert" class="alert alert-danger" style="display:none;"></div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-group">
                            <label class="control-label" for="code">
                                <?= lang("name"); ?>
                            </label>
                            <?= form_input('name', '', 'class="form-control input-sm kb-text" id="cname"'); ?>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="cemail">
                                Email:
                            </label>
                            <?= form_input('email', '', 'class="form-control input-sm kb-text" id="cemail"'); ?>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="phone">
                                <?= lang("phone"); ?>
                            </label>
                            <?= form_input('phone', '', 'class="form-control input-sm kb-pad" id="cphone"'); ?>
                        </div>
                    </div>
                    	
                     <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="cf1">
                                NIF:
                            </label>
                            <?= form_input('cf1', '999999999', 'class="form-control input-sm kb-pad" id="cf1"'); ?>
                        </div>
                    </div>	
					<div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="obs1">
                                ID da Conta:
                            </label>
                            <?= form_input('AccountID', '0', 'class="form-control input-sm kb-pad" id="AccountID"'); ?>
                        </div>
                    </div>  
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="numero">
                                Casa Nº:
                            </label>
                            <?= form_input('numero', '', 'class="form-control input-sm kb-pad" id="cphone"'); ?>
                        </div>
                    </div>		
                  	
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="bairro">
                                Morada:
                            </label>
                            <?= form_input('bairro', '', 'class="form-control input-sm kb-pad" id="bairro"'); ?>
                        </div>
                    </div>		
                   	
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="cidade">
                                Município:
                            </label>
                            <?= form_input('cidade', 'Benguela', 'class="form-control input-sm kb-pad" id="cidade"'); ?>
                        </div>
                    </div>		
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="estado">
                                Província:
                            </label>
                            <?= form_input('estado', 'Benguela', 'class="form-control input-sm kb-pad" id="estado"'); ?>
                        </div>
                    </div>		
                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="obs1">
                                OBS:
                            </label>
                            <?= form_input('obs1', '', 'class="form-control input-sm kb-pad" id="cphone"'); ?>
                        </div>
                    </div>	

                    <div class="col-xs-6">
                        <div class="form-group">
                            <label class="control-label" for="obs1">
                                País:
                            </label>
                            <?= form_input('Country', 'Angola', 'class="form-control input-sm kb-pad"  id="Country"'); ?>
                        </div>
                    </div>  						
                </div>


            </div>
            <div class="modal-footer" style="margin-top:0;">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal"> <?= lang('close') ?> </button>
                <button type="submit" class="btn btn-primary" id="add_customer"> <?= lang('add_customer') ?> </button>
            </div>
            <?= form_close(); ?>
        </div>
    </div>
</div>
<div class="modal" data-easein="flipYIn" id="auto_date_payment" tabindex="-1" role="dialog" aria-labelledby="payModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-success">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 class="modal-title" id="payModalLabel">
                    <?= lang('payment') ?> <?= lang('automatic') ?>
                </h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-offset-2 col-md-8">
                        <div class="input-group">
                            <span class="input-group-addon" id="sizing-addon2"><i class="fa fa-calendar"></i></span>
                            <input type="text" class="form-control datetimepicker" placeholder="" aria-describedby="sizing-addon2">
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal"> <?= lang('close') ?> </button>
                <button class="btn btn-primary" id="auto_date_print"><?= lang('submit') ?></button>
            </div>
        </div>
    </div>
</div>
<style type="text/css">
    .table_wrap{
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 10px;
    }
    .table-item{
        border: 3px double #ccc;
        width: 100%;
        min-height: 50px;
        text-align: center;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
    }
    .table_busy{
        background: red !important;
    }
    .table_active{
        background: #8c8c8c;
        color: white;
    }

</style>
<div id="table_modal" data-easein="flipYIn" class="modal fade " role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><?php echo lang("select_mesa"); ?></h4>
      </div>
      <div class="modal-body">
        <div class="table_wrap">

            <?php 
                $tables = get_rows("mesas");
                foreach ($tables as $key => $table) {
            ?>
            <div class="table-item <?php if(!empty($suspend["mesa"]) && $suspend["hold_ref"] == $table["name"]) echo "table_active"; ?> <?php if($table['status'] == 1) echo "table_busy"; ?>" data-id="<?php echo $table['id']; ?>" data-name="<?php echo $table['name']; ?>">
                <span><?php echo $table['name']; ?></span>
            </div>
            <?php 
            }
            ?>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

<script type="text/javascript">
    var page_title = "cash_sale";
</script>
<script src="<?= $assets ?>bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/fastclick/fastclick.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/redactor/redactor.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/iCheck/icheck.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/select2/select2.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/formvalidation/js/formValidation.popular.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/formvalidation/js/framework/bootstrap.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/common-libs.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/jquery-ui.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/app.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/pages/all.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/custom.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/input-mask/jquery.inputmask.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/input-mask/jquery.inputmask.date.extensions.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/velocity/velocity.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/velocity/velocity.ui.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/parse-track-data.js" type="text/javascript"></script>
<?php if ($Settings->java_applet) { ?>
    <script type="text/javascript" src="<?= $assets ?>plugins/qz/js/deployJava.js"></script>
    <script type="text/javascript" src="<?= $assets ?>plugins/qz/qz-functions.js"></script>
    <script type="text/javascript">
    deployQZ('themes/<?= $Settings->theme ?>/assets/plugins/qz/qz-print.jar', '<?= $assets ?>plugins/qz/qz-print_jnlp.jnlp');
    function printBill(bill) {
        usePrinter("<?= $Settings->receipt_printer; ?>");
        printData(bill);
    }
    <?php
    $printers = json_encode(explode('|', $Settings->pos_printers));
    echo 'var printer = ' . $printers . ';
';
    ?>
        function printOrder(order) {
            for (index = 0; index < printers.length; index++) {
                usePrinter(printers[index]);
                printData(order);
            }
        }
    </script>
<?php } ?>
<script type="text/javascript">
    var base_url = '<?= base_url(); ?>', assets = '<?= $assets ?>';
</script>
<!-- Notifications -->
<link rel="stylesheet" href="<?= $assets ?>plugins/jquery-toast-plugin-master/src/jquery.toast.css">
<script src="<?= $assets ?>plugins/jquery-toast-plugin-master/src/jquery.toast.js"></script>
<script src="<?= $assets ?>dist/js/pos.js" type="text/javascript"></script>
<script src="<?= $assets ?>dist/js/subitem.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/bootstrap-datetimepicker/js/moment.min.js" type="text/javascript"></script>
<script src="<?= $assets ?>plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('.datetimepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm'
        });
        $("body").on("click","#select_mesa_show",function(){
            $(".table_active").removeClass("table_active");
            $(".table-item[data-id='"+localStorage.getItem('table')+"']").addClass("table_active");
            $("#table_modal").modal("show");
        })
        $("body").on("click",".table-item",function(){
            $(".table_active").removeClass("table_active");
            $(this).addClass("table_active");
            $("#select_mesa_show").html($(this).data("name"));
            value = $(this).data("id");
            $("#select_mesa option[value='"+value+"']").prop("selected","selected");
            $("#select_mesa").change();
            $("#table_modal").modal("hide");
            $("#suspend").click();
        })
        $("#add_auto_print").on("click", function(e){
            $("#auto_date_payment").modal("show");
        });
        $("#auto_date_print").on("click", function(e){
            alert("submit");
        })
        //   $('#select_mesa').select2({"width": "100%"});
        var $default = localStorage.getItem('table');
<?php if (empty($_GET['hold'])): ?>
            if ($default > 0) {
                $('#select_mesa').val($default).trigger('change');
                $("#select_mesa_show").html($("#select_mesa option[value='"+$default+"']").html());

            } else {
                $('#select_mesa').val('no').trigger('change');
                $("#select_mesa_show").html($("#select_mesa option[value='no']").html());

            }
<?php endif; ?>
<?php if (!empty($_GET['hold'])): ?>
            localStorage.setItem('table', $("#select_mesa :selected").val());
            localStorage.setItem('table-t', $("#select_mesa :selected").text());
<?php endif; ?>
        $("#select_mesa").change(function () {
            if ($(this).val() !== "no") {
                localStorage.setItem('table', $(this).val());
                localStorage.setItem('table-t', $("#select_mesa :selected").text());
            }
        });
    });
</script>
<script type="text/javascript">
    var admin = "<?php echo ($Admin)?'1':'0'; ?>";
    var dateformat = '<?= $Settings->dateformat; ?>', timeformat = '<?= $Settings->timeformat ?>';
<?php unset($Settings->protocol, $Settings->smtp_host, $Settings->smtp_user, $Settings->smtp_pass, $Settings->smtp_port, $Settings->smtp_crypto, $Settings->mailpath, $Settings->timezone, $Settings->setting_id, $Settings->default_email, $Settings->version, $Settings->stripe, $Settings->stripe_secret_key, $Settings->stripe_publishable_key); ?>
    var Settings = <?= json_encode($Settings); ?>;
    var sid = false, username = '<?= $this->session->userdata('username'); ?>', spositems = {};
    $(window).load(function () {
        $('#mm_<?= $m ?>').addClass('active');
        $('#<?= $m ?>_<?= $v ?>').addClass('active');
    });
    var pro_limit = <?= $Settings->pro_limit ?>, java_applet = 0, count = 1, total = 0, an = 1, p_page = 0, page = 0, cat_id = <?= $Settings->default_category ?>, tcp = <?= $tcp ?>;
    var gtotal = 0, order_discount = 0, order_tax = 0, protect_delete = <?= ($Admin) ? 0 : ($Settings->pin_code ? 1 : 0); ?>;
    var order_data = '', bill_data = '';
    var lang = new Array();
    lang['code_error'] = '<?= lang('code_error'); ?>';
    lang['r_u_sure'] = '<?= lang('r_u_sure'); ?>';
    lang['please_add_product'] = '<?= lang('please_add_product'); ?>';
    lang['paid_less_than_amount'] = '<?= lang('paid_less_than_amount'); ?>';
    lang['x_suspend'] = '<?= lang('x_suspend'); ?>';
    lang['discount_title'] = '<?= lang('discount_title'); ?>';
    lang['update'] = '<?= lang('update'); ?>';
    lang['tax_title'] = '<?= lang('tax_title'); ?>';
    lang['leave_alert'] = '<?= lang('leave_alert'); ?>';
    lang['close'] = '<?= lang('close'); ?>';
    lang['delete'] = '<?= lang('delete'); ?>';
    lang['no_match_found'] = '<?= lang('no_match_found'); ?>';
    lang['wrong_pin'] = '<?= lang('wrong_pin'); ?>';
    lang['file_required_fields'] = '<?= lang('file_required_fields'); ?>';
    lang['enter_pin_code'] = '<?= lang('enter_pin_code'); ?>';
    lang['incorrect_gift_card'] = '<?= lang('incorrect_gift_card'); ?>';
    lang['card_no'] = '<?= lang('card_no'); ?>';
    lang['value'] = '<?= lang('value'); ?>';
    lang['balance'] = '<?= lang('balance'); ?>';
    lang['unexpected_value'] = '<?= lang('unexpected_value'); ?>';
    lang['inclusive'] = '<?= lang('inclusive'); ?>';
    lang['exclusive'] = '<?= lang('exclusive'); ?>';
    lang['total'] = '<?= lang('total'); ?>';
    lang['total_items'] = '<?= lang('total_items'); ?>';
    lang['order_tax'] = '<?= lang('order_tax'); ?>';
    lang['order_discount'] = '<?= lang('order_discount'); ?>';
    lang['total_payable'] = '<?= lang('total_payable'); ?>';
    lang['rounding'] = '<?= lang('rounding'); ?>';
    lang['grand_total'] = '<?= lang('grand_total'); ?>';

    $(document).ready(function () {
        if($("body").width()<500){
            $("#category_window").slick({
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll:1
            });
        } else {
            $("#category_window").slick({
                dots: true,
                infinite: true,
                slidesToShow: 6,
                slidesToScroll:1
            });
        }

        posScreen();
<?php if ($this->session->userdata('rmspos')) { ?>
            if (get('spositems')) {
                remove('spositems');
            }
            if (get('spos_discount')) {
                remove('spos_discount');
            }
            if (get('spos_tax')) {
                remove('spos_tax');
            }
            if (get('spos_note')) {
                remove('spos_note');
            }
            if (get('spos_customer')) {
                remove('spos_customer');
            }
            if (get('amount')) {
                remove('amount');
            }
    <?php
    $this->tec->unset_data('rmspos');
}
?>

        if (get('rmspos')) {
            if (get('spositems')) {
                remove('spositems');
            }
            if (get('spos_discount')) {
                remove('spos_discount');
            }
            if (get('spos_tax')) {
                remove('spos_tax');
            }
            if (get('spos_note')) {
                remove('spos_note');
            }
            if (get('spos_customer')) {
                remove('spos_customer');
            }
            if (get('amount')) {
                remove('amount');
            }
            remove('rmspos');
        }
<?php if ($sid) { ?>
            store('spositems', JSON.stringify(<?= $items; ?>));
    <?php if (!empty($subitems)): ?>
                store('subitem', JSON.stringify(<?= $subitems; ?>));
    <?php endif; ?>
            store('spos_discount', '<?= $suspend_sale->order_discount_id; ?>');
            store('spos_tax', '<?= $suspend_sale->order_tax_id; ?>');
            store('spos_customer', '<?= $suspend_sale->customer_id; ?>');
            $('#spos_customer').select2('val', '<?= $suspend_sale->customer_id; ?>');
            store('rmspos', '1');
            $('#tax_val').val('<?= $suspend_sale->order_tax_id; ?>');
            $('#discount_val').val('<?= $suspend_sale->order_discount_id; ?>');
<?php } elseif ($eid) { ?>

            store('spositems', JSON.stringify(<?= $items; ?>));
            store('subitem', JSON.stringify(<?= $subitems; ?>));

            store('spos_discount', '<?= $sale->order_discount_id; ?>');
            store('spos_tax', '<?= $sale->order_tax_id; ?>');
            store('spos_customer', '<?= $sale->customer_id; ?>');
            $('#spos_customer').select2('val', '<?= $sale->customer_id; ?>');
            store('rmspos', '1');
            $('#tax_val').val('<?= $sale->order_tax_id; ?>');
            $('#discount_val').val('<?= $sale->order_discount_id; ?>');
<?php } else { ?>
            if (!get('spos_discount')) {
                store('spos_discount', '<?= $Settings->default_discount; ?>');
                $('#discount_val').val('<?= $Settings->default_discount; ?>');
            }
            if (!get('spos_tax')) {
                store('spos_tax', '<?= $Settings->default_tax_rate; ?>');
                $('#tax_val').val('<?= $Settings->default_tax_rate; ?>');
            }
<?php } ?>

        if (ots = get('spos_tax')) {
            $('#tax_val').val(ots);
        }
        if (ods = get('spos_discount')) {
            $('#discount_val').val(ods);
        }
        if (Settings.display_kb == 1) {
            display_keyboards();
        }
        nav_pointer();
        loadItems();
        read_card();
        bootbox.addLocale('bl', {OK: '<?= lang('ok'); ?>', CANCEL: '<?= lang('no'); ?>', CONFIRM: '<?= lang('yes'); ?>'});
        bootbox.setDefaults({closeButton: false, locale: "bl"});

<?php if ($eid) { ?>
            $('#suspend').attr('disabled', true);
            $('#print_order').attr('disabled', true);
            $('#print_bill').attr('disabled', true);
<?php } ?>
    });
</script>

</body>
</html>
