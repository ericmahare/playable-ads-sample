var i,j,k,n,config={mode:"pa",title:"Watering",genre:"hypercasual",vesion:"9.0.11",links:{android:"https://play.google.com/store/apps/details?id=com.plinko.master.coin",ios:"https://play.google.com/store/apps/details?id=com.plinko.master.coin"},platform:{network:"dapi",labels:"%nuc_events_labels%"}},appObj={tmFPS:0,tmRenderFPS:1},tmDebug=0,fingerInterval=0,fingerFlag=!1,appMc={},appMt={},matterWidth=1200,matterHeight=1200,aLoadSounds=[],appSounds={};for(i=0;i<aLoadSounds.length;i++)aLoadSounds[i].sprite?appSounds[aLoadSounds[i].name]=new Howl({src:[aLoadSounds[i].path],sprite:aLoadSounds[i].sprite,volume:aLoadSounds[i].volume,loop:aLoadSounds[i].loop}):appSounds[aLoadSounds[i].name]=new Howl({src:[aLoadSounds[i].path],volume:aLoadSounds[i].volume,loop:aLoadSounds[i].loop});var renderer,stage,mraidGetMaxSize,loader,AppCanvas=document.createElement("canvas"),addover=!1,score=0,tmLineGameOver=0,toRAD=Math.PI/180,idMoneyEff=0,totalMoneyEff=9,idCircularEff=0,totalCircularEff=400,idpotBling=0,demoScore=0,totalScore={score:0},totalEndScore={score:0},endNum=3,ballnum=0,leftBall=30,elapsed=Date.now(),cPoint=[{x:50,y:50},{x:170,y:50},{x:290,y:50},{x:410,y:50},{x:530,y:50},{x:110,y:170},{x:230,y:170},{x:350,y:170},{x:470,y:170},{x:190,y:300},{x:300,y:300},{x:410,y:300},{x:110,y:430},{x:230,y:430},{x:350,y:430},{x:470,y:430},{x:50,y:550},{x:170,y:550},{x:290,y:550},{x:410,y:550},{x:530,y:550}],potPoint=[{x:100,y:820},{x:300,y:820},{x:500,y:820}];function InitApp(){NUC.callback.onStart((a,p,e)=>{window.screenSize.width=a,window.screenSize.height=p,Resize()}),NUC.callback.onTimeUpdate(a=>{}),NUC.init(config.mode,config.title,config.genre,config.vesion,config.platform),InitPixi()}function InitPixi(){getScreenSize();appObj.canvasWidth=Math.ceil(window.innerWidth),appObj.canvasHeight=Math.ceil(window.innerHeight),AppCanvas.id="AppCanvas",AppCanvas.width=appObj.canvasWidth,AppCanvas.height=appObj.canvasHeight,(renderer=new PIXI.autoDetectRenderer(appObj.canvasWidth,appObj.canvasHeight,{view:AppCanvas,transparent:!0,antialias:!0})).transparent=!0,document.getElementById("pixi").append(renderer.view),(stage=new PIXI.Container).position.set(Math.ceil(.5*appObj.canvasWidth),Math.ceil(.5*appObj.canvasHeight)),(loader=new AssetsPreloader(window.imgsrc)).preload(ProccesingInitAd),appMt.engine=Matter.Engine.create(),appMt.world=appMt.engine.world,appMt.runner=Matter.Runner.create(),Matter.Runner.run(appMt.runner,appMt.engine)}function ProccesingInitAd(){InitBasicObj(),Resize(),window.onresize=Resize,InitAnimation(),StageEF()}function InitBasicObj(){appMc.mcMain=new PIXI.Container,appMc.mcMain.visible=!1,stage.addChild(appMc.mcMain),appMc.mcGame=new PIXI.Container,appMc.mcMain.addChild(appMc.mcGame),appMc.mcBg=new PIXI.Sprite,appMc.mcBg.texture=PIXI.utils.TextureCache.bg,appMc.mcBg.anchor.set(.5),appMc.mcGame.addChild(appMc.mcBg),appMc.leftBallsContainer=new PIXI.Container,appMc.leftBallsContainer.scale.set(1.5),appMc.mcGame.addChild(appMc.leftBallsContainer),appMc.leftBalls=new PIXI.Sprite,appMc.leftBalls.texture=PIXI.utils.TextureCache.ball,appMc.leftBalls.anchor.set(.5),appMc.leftBalls.scale.set(.9),appMc.leftBallsContainer.addChild(appMc.leftBalls),appMc.leftBallsT=new PIXI.Text("X 30",{fontFamily:"gamefont",fontSize:"28px",fill:"#fff",align:"center",stroke:"#222222",strokeThickness:4}),appMc.leftBallsT.anchor.set(0,.5),appMc.leftBallsT.x=20,appMc.leftBallsContainer.addChild(appMc.leftBallsT),appMc.mtGame=new PIXI.Container,appMc.mcMain.addChild(appMc.mtGame),appMc.mtGameMask=new PIXI.Graphics,appMc.mtGameMask.beginFill(1248778,.01),appMc.mtGameMask.drawRect(-150,-300,900,1200),appMc.mtGameMask.endFill(),appMc.mtGame.addChild(appMc.mtGameMask),appMc.ballRegister=[],appMc.leftTriangle=new PIXI.Sprite,appMc.leftTriangle.texture=PIXI.utils.TextureCache.leftTriangle,appMc.leftTriangle.anchor.set(.5),appMc.leftTriangle.scale.set(.9),appMc.mtGame.addChild(appMc.leftTriangle),appMc.rightTriangle=new PIXI.Sprite,appMc.rightTriangle.texture=PIXI.utils.TextureCache.rightTriangle,appMc.rightTriangle.anchor.set(.5),appMc.rightTriangle.scale.set(.9),appMc.mtGame.addChild(appMc.rightTriangle),appMt.leftTriangle=Matter.Bodies.fromVertices(-20,300,[{x:0,y:0},{x:180,y:160},{x:0,y:320}],{isStatic:!0}),Matter.World.add(appMt.world,appMt.leftTriangle),appMt.rightTriangle=Matter.Bodies.fromVertices(620,300,[{x:100,y:0},{x:-80,y:160},{x:100,y:320}],{isStatic:!0}),Matter.World.add(appMt.world,appMt.rightTriangle),Matter.World.add(appMt.world,[Matter.Bodies.rectangle(710,500,50,1e3,{isStatic:!0}),Matter.Bodies.rectangle(-75,500,50,1e3,{isStatic:!0})]);for(var a=0;a<potPoint.length;a++)appMc["pot"+a]=new PIXI.Sprite,appMc["pot"+a].texture=PIXI.utils.TextureCache["pot"+a],appMc["pot"+a].anchor.set(.5),appMc["pot"+a].scale.set(2),appMc.mtGame.addChild(appMc["pot"+a]),appMc["potReward"+a]=new PIXI.Sprite,appMc["potReward"+a].texture=PIXI.utils.TextureCache["potReward"+a],appMc["potReward"+a].anchor.set(.5),appMc["potReward"+a].scale.set(1.2),appMc.mtGame.addChild(appMc["potReward"+a]),appMc["potReward"+a].x=potPoint[a].x,appMc["potReward"+a].y=potPoint[a].y+20,appMt["pot"+a]=Matter.Bodies.fromVertices(potPoint[a].x,potPoint[a].y,[{x:5,y:40},{x:0,y:120},{x:140,y:120},{x:140,y:100},{x:135,y:40},{x:125,y:40},{x:120,y:100},{x:120,y:100},{x:15,y:100},{x:15,y:40}],{isStatic:!0}),Matter.World.add(appMt.world,appMt["pot"+a]),coordSync(appMc["pot"+a],appMt["pot"+a]);appMc.addMoneyTstyle={fontFamily:"gamefont",fontSize:"30px",fill:"#6aff7d",fontWeight:"bold",align:"center",stroke:"#000",strokeThickness:2};for(a=0;a<potPoint.length;a++)appMc["potHalo"+a]=new PIXI.Sprite,appMc["potHalo"+a].texture=PIXI.utils.TextureCache.potHalo,appMc["potHalo"+a].anchor.set(.5),appMc.mtGame.addChild(appMc["potHalo"+a]),appMc["potHalo"+a].x=potPoint[a].x,appMc["potHalo"+a].y=potPoint[a].y-150,appMc["potHalo"+a].alpha=0;for(a=0;a<totalCircularEff;a++)appMc["circular"+a]=new PIXI.Sprite,appMc["circular"+a].texture=PIXI.utils.TextureCache.circular,appMc["circular"+a].alpha=0,appMc["circular"+a].scale.set(0),appMc["circular"+a].anchor.set(.5),appMc.mtGame.addChild(appMc["circular"+a]),appMc["circularT"+a]=new PIXI.Text("$0.50",appMc.addMoneyTstyle),appMc["circularT"+a].anchor.set(.5),appMc["circularT"+a].alpha=0,appMc.mtGame.addChild(appMc["circularT"+a]),appMc["potbling"+a]=new PIXI.Sprite,appMc["potbling"+a].texture=PIXI.utils.TextureCache["potbling"+Math.floor(3*Math.random())],appMc["potbling"+a].alpha=0,appMc["potbling"+a].anchor.set(.5),appMc["potbling"+a].scale.set(.5),appMc.mtGame.addChild(appMc["potbling"+a]);for(a=0;a<cPoint.length;a++)appMt["collision"+a]=Matter.Bodies.circle(cPoint[a].x,cPoint[a].y,21,{isStatic:!0,restitution:.5}),Matter.World.add(appMt.world,appMt["collision"+a]),appMc["obsDollar"+a]=new PIXI.Sprite,appMc["obsDollar"+a].texture=PIXI.utils.TextureCache.obsDollar,appMc["obsDollar"+a].scale.set(1.5),appMc["obsDollar"+a].anchor.set(.5),appMc.mtGame.addChild(appMc["obsDollar"+a]),coordSync(appMc["obsDollar"+a],appMt["collision"+a]);appMc.mcBalls=new PIXI.Container,appMc.mtGame.addChild(appMc.mcBalls),coordSync(appMc.leftTriangle,appMt.leftTriangle),coordSync(appMc.rightTriangle,appMt.rightTriangle),appMc.mcBannerbox=new PIXI.Container,appMc.mcGame.addChild(appMc.mcBannerbox),appMc.mcBanner=new PIXI.Sprite,appMc.mcBanner.texture=PIXI.utils.TextureCache.banner,appMc.mcBanner.anchor.set(.5),appMc.mcBannerbox.addChild(appMc.mcBanner),appMc.mcBannerT=new PIXI.Text("$0.00",{fontFamily:"gamefont",fontSize:"50px",fill:"#2eb950",fontWeight:"bold",align:"center",stroke:"#000",strokeThickness:4}),appMc.mcBannerT.anchor.set(0,.5),appMc.mcBannerT.x=20,appMc.mcBannerT.y=28,appMc.mcBannerbox.addChild(appMc.mcBannerT),appMc.underbarContainer=new PIXI.Container,appMc.underbarContainer.scale.set(.75),appMc.mcMain.addChild(appMc.underbarContainer),appMc.underbar=new PIXI.Sprite,appMc.underbar.texture=PIXI.utils.TextureCache.underbar,appMc.underbar.anchor.set(.5),appMc.underbarContainer.addChild(appMc.underbar),appMc.underbarT=new PIXI.Text("For illustration purposes only;\nno rewards are provided for\nad play or completion.",{fontSize:"42px",fill:"#fff",align:"center",fontWeight:"bold",stroke:"#222222",strokeThickness:4}),appMc.underbarT.anchor.set(.5),appMc.underbarT.x=-80,appMc.download=new PIXI.Sprite,appMc.download.texture=PIXI.utils.TextureCache.download,appMc.download.anchor.set(.5),appMc.download.x=320,appMc.underbarContainer.addChild(appMc.download),appMc.underbarContainer.addChild(appMc.underbarT),appMc.tipsContainer=new PIXI.Container,appMc.tipsContainer.x=350,appMc.tipsContainer.y=300,appMc.tipsContainer.visible=!0,appMc.mtGame.addChild(appMc.tipsContainer),appMc.mcFinger=new PIXI.Sprite,appMc.mcFinger.texture=PIXI.utils.TextureCache.finger,appMc.mcFinger.anchor.set(.5),appMc.mcFinger.a=0,appMc.tipsContainer.addChild(appMc.mcFinger),appMc.tipsT=new PIXI.Text("TAP TO PLAY",{fontFamily:"gamefont",fontSize:"50px",fill:"#ffffff",fontWeight:"bold",dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowAlpha:.8,dropShadowAngle:2.1,align:"center",stroke:"#222222",strokeThickness:4}),appMc.tipsT.anchor.set(.5),appMc.tipsT.y=380,appMc.tipsT.x=-50,appMc.tipsT.a=0,appMc.tipsContainer.addChild(appMc.tipsT),appMc.MoneyArr=[],appMc.CoinArr=[];for(a=0;a<61;a++){var p=(p="00".substring(0,"00".length-a.toString().length))+a.toString();appMc.MoneyArr.push(PIXI.utils.TextureCache["money_"+p]),appMc.CoinArr.push(PIXI.utils.TextureCache["coin_"+p])}var e={scale:{start:1,end:2},speed:{start:500,end:120},startRotation:{min:0,max:360},lifetime:{min:.5,max:5},blendMode:"normal",frequency:.008,emitterLifetime:-1,maxParticles:60,pos:{x:0,y:0},spawnType:"point"};appMc.emitterContainer=new PIXI.Container,appMc.emitterMoney=new PIXI.particles.Emitter(appMc.emitterContainer,[{framerate:60,loop:!0,textures:appMc.MoneyArr}],e),appMc.emitterCoin=new PIXI.particles.Emitter(appMc.emitterContainer,[{framerate:60,loop:!0,textures:appMc.CoinArr}],e),appMc.emitterCoin.particleConstructor=PIXI.particles.AnimatedParticle,appMc.emitterMoney.particleConstructor=PIXI.particles.AnimatedParticle,appMc.emitterMoney.emit=!1,appMc.emitterCoin.emit=!1,appMc.mcEndCardContainer=new PIXI.Container,appMc.mcEndCardContainer.visible=0,appMc.mcMain.addChild(appMc.mcEndCardContainer),appMc.mcEndMask=new PIXI.Graphics,appMc.mcEndMask.beginFill(1248778,1),appMc.mcEndMask.drawRect(-640,-640,1280,1280),appMc.mcEndMask.endFill(),appMc.mcEndMask.alpha=.5,appMc.mcEndCardContainer.addChild(appMc.mcEndMask),appMc.mcEndCardContainer.addChild(appMc.emitterContainer),appMc.mcEndCard=new PIXI.Container,appMc.mcEndCard.scale.set(0),appMc.mcEndCardContainer.addChild(appMc.mcEndCard),appMc.mcEndbox=new PIXI.Graphics,appMc.mcEndbox.beginFill(16777215,1),appMc.mcEndbox.drawRoundedRect(-260,-240,520,480,30),appMc.mcEndbox.endFill(),appMc.mcEndCard.addChild(appMc.mcEndbox),appMc.mcpayicon=new PIXI.Sprite,appMc.mcpayicon.texture=PIXI.utils.TextureCache.paypal,appMc.mcpayicon.anchor.set(.5),appMc.mcpayicon.scale.set(.8),appMc.mcpayicon.y=-180,appMc.mcEndCard.addChild(appMc.mcpayicon),appMc.mcEndT=new PIXI.Text("win real money",{fontFamily:"gamefont",fontSize:"50px",fill:"#222222",fontWeight:"bold",align:"center"}),appMc.mcEndT.y=-80,appMc.mcEndT.anchor.set(.5,.5),appMc.mcEndCard.addChild(appMc.mcEndT),appMc.mcEndT1=new PIXI.Text("from",{fontFamily:"gamefont",fontSize:"50px",fill:"#222222",fontWeight:"bold",align:"center"}),appMc.mcEndT1.x=125,appMc.mcEndT1.anchor.set(.5,.5),appMc.mcEndCard.addChild(appMc.mcEndT1),appMc.mcEndT0=new PIXI.Text("$0.00",{fontFamily:"gamefont",fontSize:"50px",fill:"#2eb950",fontWeight:"bold",align:"center",stroke:"#000",strokeThickness:4}),appMc.mcEndT0.x=-80,appMc.mcEndT0.anchor.set(.5,.5),appMc.mcEndCard.addChild(appMc.mcEndT0),appMc.mcEndT2=new PIXI.Text("Plinko Master",{fontFamily:"gamefont",fontSize:"50px",fill:"#222222",fontWeight:"bold",align:"center"}),appMc.mcEndT2.anchor.set(.5,.5),appMc.mcEndCard.addChild(appMc.mcEndT2),appMc.mcEndT2.y=70,appMc.mcEndBtn=new PIXI.Container,appMc.mcEndBtn.a=0,appMc.mcEndBtn.y=170,appMc.mcEndCard.addChild(appMc.mcEndBtn),appMc.mcEndBtnbg=new PIXI.Sprite,appMc.mcEndBtnbg.texture=PIXI.utils.TextureCache.endbtn,appMc.mcEndBtnbg.anchor.set(.5),appMc.mcEndBtnbg.scale.set(1),appMc.mcEndBtn.addChild(appMc.mcEndBtnbg),appMc.mcEndBtnT=new PIXI.Text("Redeem now",{fontFamily:"gamefont",fontSize:"50px",fontWeight:"bold",fill:"#ffffff",dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowAngle:Math.PI/6,align:"center"}),appMc.mcEndBtnT.anchor.set(.5,.6),appMc.mcEndBtn.addChild(appMc.mcEndBtnT),appMc.mcEndbox.interactive=!0,appMc.mcEndbox.on("pointerup",ClickAd),appMc.mtGameMask.interactive=!0,appMc.mtGameMask.on("pointerup",inputBall),appMc.mcBannerbox.interactive=!0,appMc.mcBannerbox.on("pointerup",ClickAd),appMc.underbarContainer.interactive=!0,appMc.underbarContainer.on("pointerup",ClickAd),Matter.Events.on(appMt.engine,"collisionStart",addScore),Matter.Events.on(appMt.engine,"afterUpdate",removeBalls)}function InitAnimation(){appMc.mcMain.visible=!0,document.getElementById("main").style.visibility="visible",document.getElementById("progress").style.display="none",NUC.trigger.ready()}function onButtonUp(a){}function inputBall(a){if(0!==leftBall){if(fingerFlag=!0,fingerInterval=0,appMc.tipsContainer.visible=!1,1===leftBall){EndGame();for(var p=0;p<10;p++)appMc["ball"+ballnum]={pic:{},phx:{}},ix=80+50*p,appMc["ball"+ballnum].pic=new PIXI.Sprite,appMc["ball"+ballnum].pic.texture=PIXI.utils.TextureCache.ball,appMc["ball"+ballnum].pic.anchor.set(.5),appMc["ball"+ballnum].pic.scale.set(1.2),appMc["ball"+ballnum].pic.x=ix,appMc["ball"+ballnum].pic.y=-180,appMc.mcBalls.addChild(appMc["ball"+ballnum].pic),appMc["ball"+ballnum].phx=Matter.Bodies.circle(ix,-180,24,{restitution:.8}),appMc["ball"+ballnum].isRemove=!1,Matter.Body.setVelocity(appMc["ball"+ballnum].phx,{x:getRan(1),y:5}),Matter.World.add(appMt.world,appMc["ball"+ballnum].phx),appMc.ballRegister.push(appMc["ball"+ballnum]),ballnum++}leftBall--,appMc.leftBallsT.text="X "+leftBall;var e=appMc.mtGame.toLocal(a.data.global);appMc["ball"+ballnum]={pic:{},phx:{}},appMc["ball"+ballnum].pic=new PIXI.Sprite,appMc["ball"+ballnum].pic.texture=PIXI.utils.TextureCache.ball,appMc["ball"+ballnum].pic.anchor.set(.5),appMc["ball"+ballnum].pic.scale.set(1.2),appMc["ball"+ballnum].pic.x=e.x,appMc["ball"+ballnum].pic.y=-180,appMc.mcBalls.addChild(appMc["ball"+ballnum].pic),appMc["ball"+ballnum].phx=Matter.Bodies.circle(e.x,-180,24,{restitution:.8}),appMc["ball"+ballnum].isRemove=!1,Matter.Body.setVelocity(appMc["ball"+ballnum].phx,{x:getRan(1),y:5}),Matter.World.add(appMt.world,appMc["ball"+ballnum].phx),appMc.ballRegister.push(appMc["ball"+ballnum]),ballnum++}}function addScore(a){var p=a.pairs.slice()[0].bodyA;p.id>16&&p.id<38&&"Circle Body"==p.label&&(appMc["circular"+idCircularEff].scale.set(.4),appMc["circular"+idCircularEff].x=p.position.x,appMc["circular"+idCircularEff].y=p.position.y,appMc["circular"+idCircularEff].alpha=.4,appMc["circularT"+idCircularEff].x=p.position.x,appMc["circularT"+idCircularEff].y=p.position.y,appMc["circularT"+idCircularEff].alpha=1,gsap.to(appMc["circularT"+idCircularEff],{duration:.8,y:p.position.y-80}),gsap.to(appMc["circularT"+idCircularEff],{duration:.4,delay:.4,alpha:0}),gsap.to(appMc["circular"+idCircularEff],{duration:.4,ease:"power4.in",alpha:0}),gsap.to(appMc["circular"+idCircularEff].scale,{duration:.4,x:1.5,y:1.5}),++idCircularEff==totalCircularEff&&(idCircularEff=0),AddMoney(.5,0))}function AddMoney(a,p){addover||(demoScore+=a,gsap.to(totalScore,{duration:1,delay:p,score:demoScore,onUpdate:function(){appMc.mcBannerT.text="$"+totalScore.score.toFixed(2)}}))}function getRan(a){return void 0===a&&(a=50),(.5<Math.random()?1:-1)*Math.random()*a}function removeBalls(a){for(var p=[],e=0,t=appMc.ballRegister.length;e<t;e++){var n=appMc.ballRegister[e];n.isRemove||(isEnter(n.phx.position)&&(n.phx.position.x>50&&n.phx.position.x<150?(potHaloShow(appMc.potHalo0,0),AddMoney(7,0)):n.phx.position.x>250&&n.phx.position.x<350?(potHaloShow(appMc.potHalo1,1),AddMoney(70,0)):n.phx.position.x>450&&n.phx.position.x<550&&(potHaloShow(appMc.potHalo2,2),AddMoney(50,0)),appMc.mcBalls.removeChild(n.pic),Matter.World.remove(appMt.world,n.phx),n.isRemove=!0),n.phx.position.y>1e3&&(appMc.mcBalls.removeChild(n.pic),Matter.World.remove(appMt.world,n.phx),n.isRemove=!0),p.push(n))}appMc.ballRegister=p}function potHaloShow(a,p){gsap.to(a,{overwrite:!0}),a.alpha=1,gsap.to(a,{duration:.8,alpha:0}),appMc["potbling"+idpotBling].alpha=1,appMc["potbling"+idpotBling].x=potPoint[p].x,appMc["potbling"+idpotBling].y=potPoint[p].y-80,gsap.to(appMc["potbling"+idpotBling],{duration:.5,delay:.4,alpha:0}),gsap.to(appMc["potbling"+idpotBling],{duration:.9,y:potPoint[p].y-180}),++idpotBling==totalCircularEff&&(idpotBling=0)}function isEnter(a){var p,e,t,n,c=0;a.x>50&&a.x<150?c=75:a.x>250&&a.x<350?c=75:a.x>450&&a.x<550&&(c=75),t={x:150,y:770},n={x:150,y:870};var i=((e={x:50,y:770}).x-(p={x:50,y:870}).x)*(a.y-p.y)-(e.y-p.y)*(c-p.x),r=(t.x-e.x)*(a.y-e.y)-(t.y-e.y)*(c-e.x),o=(n.x-t.x)*(a.y-t.y)-(n.y-t.y)*(c-t.x),l=(p.x-n.x)*(a.y-n.y)-(p.y-n.y)*(c-n.x);return i>0&&r>0&&o>0&&l>0||i<0&&r<0&&o<0&&l<0}function coordSync(a,p){a.x=p.position.x,a.y=p.position.y,a.rotation=p.angle}function StageEF(){if(appObj.tmFPS++,appObj.tmFPS==appObj.tmRenderFPS){if(10==++tmDebug&&(tmDebug=0),appObj.tmFPS=0,renderer.render(stage),ballnum>0)for(var a=0;a<ballnum;a++)coordSync(appMc["ball"+a].pic,appMc["ball"+a].phx);if(appMc.mcEndBtn.visible){appMc.mcEndBtn.a+=12,appMc.mcEndBtn.a>=360&&(appMc.mcEndBtn.a-=360),appMc.mcEndBtn.scale.set(.95+.05*Math.cos(appMc.mcEndBtn.a*toRAD));var p=Date.now();appMc.emitterMoney.update(.001*(p-elapsed)),appMc.emitterCoin.update(.001*(p-elapsed)),elapsed=p}appMc.tipsContainer.visible&&(appMc.mcFinger.a+=6,appMc.mcFinger.a>=360&&(appMc.mcFinger.a-=360),appMc.mcFinger.rotation=.1*Math.cos(appMc.mcFinger.a*toRAD)-.2,appMc.mcFinger.scale.set(1+.15*Math.cos(appMc.mcFinger.a*toRAD)),appMc.tipsT.a+=6,appMc.tipsT.a>=360&&(appMc.tipsT.a-=360),appMc.tipsT.scale.set(1+.1*Math.cos(appMc.tipsT.a*toRAD))),fingerFlag&&++fingerInterval>200&&(fingerFlag=!1,fingerInterval=0,appMc.tipsContainer.visible=!0)}window.requestAnimationFrame(StageEF)}function getScreenSize(){return window.screenSize&&window.screenSize.width&&window.screenSize.height?{width:window.screenSize.width,height:window.screenSize.height}:{width:document.documentElement.clientWidth||window.innerWidth,height:document.documentElement.clientHeight||window.innerHeight}}function Resize(){var a,p,e,t,n=getScreenSize();p=n.width,a=n.height,n.width<n.height&&(a=n.width,p=n.height),window.matchMedia("(orientation: portrait)").matches?(e=a,t=p):(e=p,t=a),appObj.mainWidth=Math.ceil(e),appObj.mainHeight=Math.ceil(t),appObj.canvasWidth=Math.ceil(e),appObj.canvasHeight=Math.ceil(t),renderer.view.style.width=appObj.mainWidth+"px",renderer.view.style.height=appObj.mainHeight+"px",renderer.view.width=appObj.canvasWidth,renderer.view.height=appObj.canvasHeight,renderer.resize(appObj.canvasWidth,appObj.canvasHeight),stage.position.set(Math.ceil(.5*appObj.canvasWidth),Math.ceil(.5*appObj.canvasHeight)),appMc.mcMain.scale.set(1,1),appObj.mainWidth<appObj.mainHeight?(appMc.mcMain.scale.x=appObj.canvasWidth/720,appMc.mcMain.scale.y=appMc.mcMain.scale.x,1280*appMc.mcMain.scale.y>appObj.canvasHeight&&(appMc.mcMain.scale.y=appObj.canvasHeight/1280,appMc.mcMain.scale.x=appMc.mcMain.scale.y),appMc.mcBg.scale.x=.05+appObj.canvasWidth/960/appMc.mcMain.scale.x,appMc.mcBg.scale.y=.05+appObj.canvasHeight/960/appMc.mcMain.scale.y,appMc.mtGame.scale.set(1),appMc.mtGame.x=60-.5*appObj.canvasWidth/appMc.mcMain.scale.x,appMc.mtGame.y=.5*appObj.canvasHeight/appMc.mcMain.scale.y-1e3,appMc.mcBannerbox.scale.set(1),appMc.mcBannerbox.y=100-.5*appObj.canvasHeight/appMc.mcMain.scale.y,appMc.mcBannerbox.x=0,appMc.leftBallsContainer.x=60-.5*appObj.canvasWidth/appMc.mcMain.scale.x,appMc.leftBallsContainer.y=250-.5*appObj.canvasHeight/appMc.mcMain.scale.y,appMc.underbarContainer.x=0,appMc.underbarContainer.scale.set(.6),appMc.underbarContainer.y=.5*appObj.canvasHeight/appMc.mcMain.scale.y-50,appMc.mcEndMask.scale.x=.1+appObj.canvasWidth/1280/appMc.mcMain.scale.x,appMc.mcEndMask.scale.y=.1+appObj.canvasHeight/1280/appMc.mcMain.scale.y):(appMc.mcMain.scale.x=appObj.canvasWidth/1280,appMc.mcMain.scale.y=appMc.mcMain.scale.x,720*appMc.mcMain.scale.y>appObj.canvasHeight&&(appMc.mcMain.scale.y=appObj.canvasHeight/720,appMc.mcMain.scale.x=appMc.mcMain.scale.y),appMc.mcBg.scale.x=.05+appObj.canvasWidth/960/appMc.mcMain.scale.x,appMc.mcBg.scale.y=.05+appObj.canvasHeight/960/appMc.mcMain.scale.y,appMc.mcBannerbox.scale.set(.85),appMc.mcBannerbox.y=200-.5*appObj.canvasHeight/appMc.mcMain.scale.y,appMc.mcBannerbox.x=.5*appObj.canvasWidth/appMc.mcMain.scale.x-310,appMc.mtGame.scale.set(.8),appMc.mtGame.x=80-.5*appObj.canvasWidth/appMc.mcMain.scale.x,appMc.mtGame.y=20-.5*appObj.canvasHeight/appMc.mcMain.scale.y,appMc.leftBallsContainer.x=.5*appObj.canvasWidth/appMc.mcMain.scale.x-500,appMc.leftBallsContainer.y=350-.5*appObj.canvasHeight/appMc.mcMain.scale.y,appMc.mcEndMask.scale.x=.1+appObj.canvasWidth/1280/appMc.mcMain.scale.x,appMc.mcEndMask.scale.y=.1+appObj.canvasHeight/1280/appMc.mcMain.scale.y,appMc.underbarContainer.x=.5*appObj.canvasWidth/appMc.mcMain.scale.x-310,appMc.underbarContainer.scale.set(.6),appMc.underbarContainer.y=.5*appObj.canvasHeight/appMc.mcMain.scale.y-50)}function EndGame(){appMc.mtGameMask.interactive=!1,appMc.emitterMoney.emit=!0,appMc.emitterCoin.emit=!0,fingerFlag=!1,appMc.tipsContainer.visible=!1,NUC.trigger.endGame("win"),gsap.to(appMc.mcEndCard.scale,{duration:.8,delay:1,x:1,y:1,ease:Expo.easeInOut,onStart:function(){appMc.mcEndCardContainer.visible=1},onComplete:function(){addover=!0,gsap.to(totalEndScore,{duration:1,score:demoScore,onUpdate:function(){appMc.mcEndT0.text="$"+totalEndScore.score.toFixed(2)}})}})}window.screenSize={width:null,height:null},window.onload=InitApp;for(var raf_lastTime=0,raf_vendors=["ms","moz","webkit","o"],x=0;x<raf_vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[raf_vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[raf_vendors[x]+"CancelAnimationFrame"]||window[raf_vendors[x]+"CancelRequestAnimationFrame"];function ClickAd(){var a,p=navigator.userAgent;p.indexOf("Android")>-1||p.indexOf("Adr"),a=p.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?config.links.ios:config.links.android;try{"unity"==config.platform.network||"AppLovin"==config.platform.network?NUC.trigger.convert(a):NUC.trigger.convert()}catch(a){NUC.trigger.convert()}}window.requestAnimationFrame||(window.requestAnimationFrame=function(a,p){var e=(new Date).getTime(),t=Math.max(0,16-(e-raf_lastTime)),n=window.setTimeout(function(){a(e+t)},t);return raf_lastTime=e+t,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});