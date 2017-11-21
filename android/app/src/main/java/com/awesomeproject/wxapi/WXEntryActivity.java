packageyour.package.wxapi;

importandroid.app.Activity;

importandroid.os.Bundle;

importcom.theweflex.react.WeChatModule;

publicclassWXEntryActivityextendsActivity{

@Override

protectedvoidonCreate(Bundle savedInstanceState) {

super.onCreate(savedInstanceState);

WeChatModule.handleIntent(getIntent());

finish();

}

}

