<template>
	<view class="container">
		<!-- 分段器 -->
		<view style="position: fixed;top: 0;width: 100%;background-color: #FFFFFF;z-index: 5;">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
				activeColor="#4cd964"></uni-segmented-control>
		</view>
		<view v-show="current === 0" class="forum">
			<!-- <view class="forum-title">
				发布论坛
			</view> -->
			<!-- 发布论坛 -->
			<!-- 论坛标题 -->
			<view class="input">
				<input type="text" value="" placeholder="给论坛取个标题吧" v-model="forumTitle" />
			</view>
			<!-- 论坛分类 -->
			<view class="classification">
				<text>分类</text>
				<view class="classification-tag" v-for="(item,index) in classificationList" :key="index">
					<uni-tag :text="item.text" :type="item.type" :circle="true" @click="classSelect(item.value,index)">
					</uni-tag>
				</view>
			</view>
			<!-- 富文本编辑器，发布论坛内容 -->
			<view style="width: 90%;margin: 10px auto;">
				内容
			</view>
			<view class="editor">
				<editor id="editor" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar
					class="ql-container" :placeholder="placeholder" @statuschange="onStatusChange"
					@ready="onEditorReady">
				</editor>
			</view>
			<!-- 富文本编辑器功能区 -->
			<view class="toolbar" @touchend.stop="format" :style="'bottom: ' + (isIOS ? keyboardHeight : 0) + 'px'">
				<i class="iconfont icon-charutupian" @touchend.stop="insertImage"></i>
				<i :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')"
					data-name="header" :data-value="1"></i>
				<i :class="'iconfont icon-format-header-2 ' + (formats.header === 2 ? 'ql-active' : '')"
					data-name="header" :data-value="2"></i>
				<i :class="'iconfont icon-format-header-3 ' + (formats.header === 3 ? 'ql-active' : '')"
					data-name="header" :data-value="3"></i>
				<i :class="'iconfont icon-format-header-4 ' + (formats.header === 4 ? 'ql-active' : '')"
					data-name="header" :data-value="4"></i>
				<i :class="'iconfont icon-format-header-5 ' + (formats.header === 5 ? 'ql-active' : '')"
					data-name="header" :data-value="5"></i>
				<i :class="'iconfont icon-format-header-6 ' + (formats.header === 6 ? 'ql-active' : '')"
					data-name="header" :data-value="6"></i>
				<i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
				<i :class="'iconfont icon-zitishanchuxian ' + (formats.strike ? 'ql-active' : '')"
					data-name="strike"></i>
				<i :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></i>
				<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align"
					data-value="left"></i>
				<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')"
					data-name="align" data-value="center"></i>
				<i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align"
					data-value="right"></i>
				<i :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')"
					data-name="align" data-value="justify"></i>
				<i :class="'iconfont icon-line-height ' + (formats.lineHeight ? 'ql-active' : '')"
					data-name="lineHeight" data-value="2"></i>
				<i :class="'iconfont icon-Character-Spacing ' + (formats.letterSpacing ? 'ql-active' : '')"
					data-name="letterSpacing" data-value="2em"></i>
				<i :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')"
					data-name="marginTop" data-value="20px"></i>
				<i :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')"
					data-name="marginBottom" data-value="20px"></i>
				<i class="iconfont icon-clearedformat" @tap="removeFormat"></i>
				<i :class="'iconfont icon-font ' + (formats.fontFamily ? 'ql-active' : '')" data-name="fontFamily"
					data-value="Pacifico"></i>
				<i :class="'iconfont icon-fontsize ' + (formats.fontSize === '24px' ? 'ql-active' : '')"
					data-name="fontSize" data-value="24px"></i>
				<i :class="'iconfont icon-text_color ' + (formats.color === fontColor ? 'ql-active' : '')"
					data-name="color" :data-value="fontColor" @tap="open"></i>
				<i :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')"
					data-name="backgroundColor" data-value="#00ff00"></i>
				<!-- 引用黄河浪的color取色器 -->
				<i class="iconfont icon-date" @tap="insertDate"></i>
				<i class="iconfont icon-undo" @tap="undo"></i>
				<i class="iconfont icon-redo" @tap="redo"></i>
				<i :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')"
					data-name="underline"></i>
				<i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
				<i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')"
					data-name="list" data-value="ordered"></i>
				<i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')"
					data-name="list" data-value="bullet"></i>
				<i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
				<i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
				<i class="iconfont icon-fengexian" @tap="insertDivider"></i>
				<i class="iconfont icon-preview" @tap="store" id="2"></i>
				<i :class="'iconfont icon-zitixiabiao ' + (formats.script === 'sub' ? 'ql-active' : '')"
					data-name="script" data-value="sub"></i>
				<i :class="'iconfont icon-zitishangbiao ' + (formats.script === 'super' ? 'ql-active' : '')"
					data-name="script" data-value="super"></i>
				<!-- <i class="iconfont icon-quanping"></i> -->
				<i class="iconfont icon-shanchu" @tap="clear"></i>
				<i :class="'iconfont icon-direction-rtl ' + (formats.direction === 'rtl' ? 'ql-active' : '')"
					data-name="direction" data-value="rtl"></i>
				<i class="iconfont icon-baocun" @tap="store" id="1"></i>
			</view>
			<!-- 颜色选择器 -->
			<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @cancel="cancel"></t-color-picker>
			<view class="forum-cover">
				<uni-file-picker ref="files" disable-preview :del-icon="false" return-type="object" :auto-upload="true"
					:list-styles="listStyles" :image-styles="imageStyles" @success="uploadSuccess">选择封面
				</uni-file-picker>
			</view>
			<!-- 发布按钮 -->
			<view :class="[isSubmit?'forum-button':'no-submit']" @click="ForumSubmit()">
				发布
			</view>
		</view>
		<view v-show="current === 1" class="recruit">
			<view class="input">
				<input type="text" value="" placeholder="输入你捡到的物品(不超过10字节)" v-model="recruitName" />
			</view>
			<view class="recruit-classification">
				<text>分类</text>
				<view class="recruit-classificationContent">
					<view class="classification-tag" v-for="(item,index) in recruitClassList" :key="index">
						<uni-tag :text="item.text" :type="item.type" :circle="true"
							@click="recruitClassSelect(item.value,index)">
						</uni-tag>
					</view>
				</view>
			</view>
			<view class="recruit-img">
				<uni-file-picker ref="files1" disable-preview :del-icon="false" return-type="object" :auto-upload="true"
					:list-styles="listStyles1" :image-styles="imageStyles1" @success="uploadSuccess1">选择照片
				</uni-file-picker>
			</view>
			<view class="recruit-address">
				<text>拾到位置</text>
				<text>(注：只可定位学校，如不是在校园拾到，可直接写详细地址)</text>
				<view class="recruit-addressButton" @click="selectRecruitAddress()">
					{{address}}
				</view>
				<input placeholder="输入详细位置" type="text" value="" v-model="detailedAddress" />
			</view>
			<view class="recruit-time">
				拾到时间
				<view class="recruit-timeContent">
					<uni-section :title="'日期时间用法：' + datetimesingle" type="line"></uni-section>
					<view class="example-body">
						<uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" />
					</view>
				</view>
			</view>
			<view class="recruit-remarks">
				<view class="recruit-remarksMode">
					联系方式
					<view class="recruit-remarksPicker">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<input type="text" placeholder="请输入联系方式" value="" v-model="contactInformation" />
			</view>
			<view class="recruit-switch">
				是否匿名
				<switch checked="true" @change="recruitSwitchChange" v-model="isRecruitAnonymous" />
			</view>
			<view class="recruit-remarks">
				备注
				<input type="text" placeholder="添加备注信息" value="" v-model="recruitRemarks" />
			</view>
			<view class="recruit-location">
				物品当前位置
				<view class="recruit-locationContent">
					<view class="recruit-locationTag" v-for="(item,index) in recruitLocationList" :key="index">
						<uni-tag :text="item.text" :type="item.type" :circle="true"
							@click="recruitLocationSelect(item.value,index)">
						</uni-tag>
					</view>
				</view>
			</view>
			<view :class="[isRecruitSubmit?'forum-button':'no-submit']" @click="recruitSubmit()">
				发布
			</view>
			<uni-popup ref="popup" type="bottom" background-color="#0bc99d">
				<view style="margin: 0 auto;width: 90%;color: #FFFFFF;display: flex;">
					请选择定位的学校
					<image style="width: 50rpx;height: 50rpx;"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bfae29f1-0693-4301-8f8d-32076b896f7e.png"
						mode="widthFix"></image>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<uni-card v-for="(item,index) in schoolList" :key="index" @click="getSchool(item.title)">
						<text>{{item.title}}</text>
					</uni-card>
				</scroll-view>
			</uni-popup>
		</view>
		<view v-show="current === 2" class="recruit">
			<view class="input">
				<input type="text" value="" placeholder="输入你丢失的物品(不超过10字节)" v-model="lostName" />
			</view>
			<view class="recruit-classification">
				<text>分类</text>
				<view class="recruit-classificationContent">
					<view class="classification-tag" v-for="(item,index) in lostClassList" :key="index">
						<uni-tag :text="item.text" :type="item.type" :circle="true"
							@click="lostClassSelect(item.value,index)">
						</uni-tag>
					</view>
				</view>
			</view>
			<view class="recruit-img">
				<uni-file-picker ref="files2" disable-preview :del-icon="false" return-type="object" :auto-upload="true"
					:list-styles="listStyles1" :image-styles="imageStyles1" @success="uploadSuccess2">选择照片
				</uni-file-picker>
			</view>
			<view class="recruit-address">
				<text>丢失位置</text>
				<text>(注：只可定位学校，如不是在校园丢失，可直接写详细地址)</text>
				<view class="recruit-addressButton" @click="selectLostAddress()">
					{{lostAddress}}
				</view>
				<input placeholder="输入详细位置" type="text" value="" v-model="lostDetailedAddress" />
			</view>
			<view class="recruit-time">
				丢失时间
				<view class="recruit-timeContent">
					<uni-section :title="'日期时间用法：' + lostDatetimesingle" type="line"></uni-section>
					<view class="example-body">
						<uni-datetime-picker type="datetime" v-model="lostDatetimesingle" @change="changeLog1" />
					</view>
				</view>
			</view>
			<view class="recruit-remarks">
				<view class="recruit-remarksMode">
					联系方式
					<view class="recruit-remarksPicker">
						<picker @change="bindPickerChange1" :value="index1" :range="array1">
							<view class="uni-input">{{array1[index1]}}</view>
						</picker>
					</view>
				</view>
				<input type="text" placeholder="请输入联系方式" value="" v-model="lostContactInformation" />
			</view>
			<view class="recruit-switch">
				是否匿名
				<switch checked="true" @change="lostSwitchChange" v-model="isLostAnonymous" />
			</view>
			<view class="recruit-remarks">
				备注
				<input type="text" placeholder="添加备注信息" value="" v-model="LostRemarks" />
			</view>
			<view :class="[isLostSubmit?'forum-button':'no-submit']" @click="LostSubmit()">
				发布
			</view>
			<uni-popup ref="popup1" type="bottom" background-color="#0bc99d">
				<view style="margin: 0 auto;width: 90%;color: #FFFFFF;display: flex;">
					请选择定位的学校
					<image style="width: 50rpx;height: 50rpx;"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bfae29f1-0693-4301-8f8d-32076b896f7e.png"
						mode="widthFix"></image>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<uni-card v-for="(item,index) in schoolList1" :key="index" @click="getSchool1(item.title)">
						<text>{{item.title}}</text>
					</uni-card>
				</scroll-view>
			</uni-popup>
		</view>
		<view v-if="current === 3" class="idle">
			<view class="input">
				<input type="text" value="" placeholder="输入你要卖出的物品(不超过10字节)" v-model="idleName" />
			</view>
			<view class="recruit-switch">
				分类
				<uni-data-picker style="width: 100%;margin-top: 10rpx;" :localdata="classList" popup-title="请选择分类"
					@change="onchange" @nodeclick="onnodeclick">
				</uni-data-picker>
			</view>
			<view class="recruit-switch" style="margin-top: 10rpx;">
				闲置品质
				<uni-data-picker style="width: 100%;margin-top: 10rpx;" :localdata="qualityList" popup-title="请选择品质"
					@change="onchange1" @nodeclick="onnodeclick1">
				</uni-data-picker>
			</view>
			<view class="recruit-switch" style="margin-top: 20rpx;">
				描述
				<textarea style="width: 100%;height: 250rpx;margin-top: 10rpx;" v-model="idleDescribe" maxlength="-1"
					value="" placeholder="卖家都关心品牌型号,入手渠道,转手原因....." />
			</view>
			<view class="input">
				价格
				<view style="display: flex;align-items: center;color:#fe4543;">
					￥<input type="number" value="" placeholder="卖闲置 以新品6折价更易卖出" v-model="idlePrice" />
				</view>
			</view>
			<view class="recruit-switch" style="margin-top: 50rpx;">
				是否包邮
				<view style="display: flex;">
					<switch :checked="true" @change="idleSwitchChange1" v-model="isFreeShipping" />
					<view style="display: flex;align-items: center;color:#fe4543;">
						￥<input type="number" :disabled="isFreeShipping" value="" placeholder="请输入邮费"
							v-model="shippingPrice" />
					</view>
				</view>
			</view>
			<view class="input">
				库存
				<view style="display: flex;align-items: center;">
					<input type="number" value="" placeholder="请输入此物品库存" v-model="stockCount" />
				</view>
			</view>
			<view class="recruit-switch" style="margin-top: 50rpx;">
				上传图片（最多上传9张）
				<uni-file-picker style="margin-top: 20rpx;" v-model="idleImageList" file-mediatype="image" mode="grid"
					:limit="9" :list-styles="listStyles" :image-styles="imageStyles" @progress="progress"
					@success="success" @fail="fail" @select="select">选择照片
				</uni-file-picker>
			</view>
			<view class="recruit-switch" style="margin-top: 20rpx;">
				上传视频
				<uni-file-picker style="margin-top: 20rpx;" v-model="idleVideo" :limit="1" file-mediatype="video"
					@success="uploadVideo">
					<button>选择文件</button>
				</uni-file-picker>
			</view>
			<view class="recruit-remarks" @click="selectAddress()">
				发货地址
				<view style="display: flex;align-items: center;font-size: 13px;margin-top: 10rpx;">
					<image style="width: 30rpx;height: 30rpx;"
						src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-971c626c-d9b3-42ab-98b2-c178a544c3f6/bcb8106d-5803-494e-9419-188473a2fd42.png"
						mode="widthFix"></image>
					{{deliveryAddress}}
				</view>
			</view>
			<view class="recruit-remarks">
				<view class="recruit-remarksMode">
					联系方式
					<view class="recruit-remarksPicker">
						<picker @change="bindPickerChange2" :value="index2" :range="array2">
							<view class="uni-input">{{array2[index2]}}</view>
						</picker>
					</view>
				</view>
				<input type="text" placeholder="请输入联系方式" value="" v-model="idleContactInformation" />
			</view>
			<view class="recruit-switch">
				是否匿名
				<switch :checked="false" @change="idleSwitchChange" v-model="isIdleAnonymous" />
			</view>
			<view :class="[isIdleSubmit?'forum-button':'no-submit']" @click="idleSubmit()">
				发布
			</view>
		</view>
	</view>
</template>

<script>
	import tColorPicke from '../../components/t-color-picker.vue';
	var QQMapWX = require('../../common/location/qqmap-wx-jssdk.js');
	var qqmapsdk;
	var _self;
	export default {
		components: {
			't-color-picker': tColorPicke, //颜色选择器组件
		},
		data() {
			return {
				index: 0,
				index1: 0,
				index2: 0,
				color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				}, //rgb颜色
				isEdit: false, //富文本编辑器不只读
				fontColor: '#000',
				formats: {},
				readOnly: false,
				placeholder: '开始输入...', //富文本编辑器的placeholder
				editorHeight: 400, //富文本编辑器高度
				keyboardHeight: 0, //键盘高度
				isIOS: false,
				items: ["论坛", "招领", "寻物", "闲置"], //分段器
				current: 0, //分段器页面是否显示
				forumTitle: "", //论坛标题
				forumClass: "programming", //论坛分类
				forumContent: "", //论坛内容
				forumCover: "", //论坛封面
				classificationList: [{ //论坛分类列表
						text: "编程",
						value: "programming",
						type: "success"
					},
					{
						text: "科学",
						value: "science",
						type: "default"
					},
					{
						text: "其他",
						value: "other",
						type: "default"
					}
				],
				recruitClassList: [{ //论坛分类列表
						text: "证件",
						value: "certificates",
						type: "success"
					},
					{
						text: "服饰",
						value: "clothes",
						type: "default"
					},
					{
						text: "数码",
						value: "digital",
						type: "default"
					},
					{
						text: "日用品",
						value: "dailyNecessities",
						type: "default"
					},
					{
						text: "学习用品",
						value: "schoolSupplies",
						type: "default"
					},
					{
						text: "其他",
						value: "other",
						type: "default"
					}
				],
				lostClassList: [{ //论坛分类列表
						text: "证件",
						value: "certificates",
						type: "success"
					},
					{
						text: "服饰",
						value: "clothes",
						type: "default"
					},
					{
						text: "数码",
						value: "digital",
						type: "default"
					},
					{
						text: "日用品",
						value: "dailyNecessities",
						type: "default"
					},
					{
						text: "学习用品",
						value: "schoolSupplies",
						type: "default"
					},
					{
						text: "其他",
						value: "other",
						type: "default"
					}
				],
				recruitLocationList: [{ //论坛分类列表
						text: "本人代管",
						value: "selfCustody",
						type: "success"
					},
					{
						text: "拾取处",
						value: "situ",
						type: "default"
					},
					{
						text: "代管处",
						value: "escrowOffice",
						type: "default"
					},
					{
						text: "其他",
						value: "other",
						type: "default"
					}
				],
				array: ['手机号', 'QQ', '微信', '其他'],
				array1: ['手机号', 'QQ', '微信', '其他'],
				array2: ['手机号', 'QQ', '微信', '其他'],
				recruitName: "",
				recruitClass: "certificates",
				recruitImg: "",
				detailedAddress: "",
				schoolList: [], //定位学校列表
				schoolList1: [],
				address: "未选择",
				recruitLocation: "selfCustody",
				datetimesingle: "",
				contactInformation: "",
				isRecruitAnonymous: true,
				recruitRemarks: "",
				// isRecruitSubmit: true,
				lostName: "",
				lostClass: "certificates",
				lostImg: "",
				lostAddress: "未选择",
				lostDetailedAddress: "",
				lostDatetimesingle: "",
				lostContactInformation: "",
				isLostAnonymous: true,
				LostRemarks: "",
				imageStyles: { //上传封面的风格
					width: 100,
					height: 100,
					border: {
						color: "#c8c8d0",
						width: 2,
						style: 'dashed',
						radius: 2
					}
				},
				listStyles: { //上传封面的风格
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						radius: 2
					}
				},
				imageStyles1: { //上传封面的风格
					width: 300,
					height: 300,
					border: {
						color: "#c8c8d0",
						width: 2,
						style: 'soild',
						radius: 5
					}
				},
				listStyles1: { //上传封面的风格
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						radius: 2
					}
				},
				// isSubmit:false
				classList: [],
				qualityList: [{
					value: 1,
					text: '全新'
				}, {
					value: 2,
					text: '九九新'
				}, {
					value: 3,
					text: '九五新'
				}, {
					value: 4,
					text: '九成新'
				}, {
					value: 5,
					text: '八成新'
				}, {
					value: 6,
					text: '微瑕'
				}, {
					value: 7,
					text: '瑕疵'
				}],
				idleName: "",
				oneClass: 0,
				twoClass: 0,
				threeClass: 0,
				quality: "",
				idleDescribe: "",
				idlePrice: "",
				stockCount: 1,
				isFreeShipping: true,
				shippingPrice: "",
				idleImageList: [],
				idleVideo: [],
				deliveryAddress: "",
				idleContactInformation: "",
				isIdleAnonymous: false
			};
		},
		onLoad() {
			_self = this;
			if (this.isFreeShipping) {
				this.shippingPrice = 0
			} else {
				this.shippingPrice = ""
			}
		},
		onShow() {
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			// console.log(currPage.__data__.deliveryAddress)
			this.deliveryAddress = currPage.__data__.deliveryAddress
		},
		computed: {
			isSubmit: function() { //计算属性，负责发布按钮是否高亮
				return this.forumTitle != "" && this.forumContent != "";
			},
			isRecruitSubmit: function() {
				return this.recruitName != "" && this.detailedAddress != "" && this
					.datetimesingle != "" && this.contactInformation != ""
			},
			isLostSubmit: function() {
				return this.lostName != "" && this.lostDetailedAddress != "" && this
					.lostDatetimesingle != "" && this.lostContactInformation != ""
			},
			isIdleSubmit: function() {
				return this.idleName != "" && this.oneClass != 0 && this
					.twoClass != 0 && this.threeClass != 0 && this.quality != "" && this.idleDescribe != "" && this
					.idlePrice != "" && this.stockCount != "" && (this.isFreeShipping || this.shippingPrice != "") &&
					this.idleImageList
					.length != 0 && this.idleContactInformation != ""
			}
		},
		methods: {
			cancel() {
				this.isEdit = false;
			},
			open() {
				this.$refs.colorPicker.open();
				this.isEdit = true;
				// uni.hideKeyboard();
			},
			hideKey() {
				uni.hideKeyboard();
			},
			async confirm(e) {
				this.isEdit = false;
				this.fontColor = await e.hex;
				this.onStatusChange({
					detail: {
						color: e.hex
					}
				});
				this.$forceUpdate();
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context(function(res) {
					_self.editorCtx = res.context;
				}).exec();
			},
			undo() {
				this.editorCtx.undo();
			},
			redo() {
				this.editorCtx.redo();
			},
			blur() {
				this.editorCtx.blur();
			},
			format(e) {
				// this.hideKey();
				let {
					name,
					value
				} = e.target.dataset;
				if (!name) return; // console.log('format', name, value)
				this.editorCtx.format(name, value);
			},
			onStatusChange(e) {
				this.formats = e.detail;
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success');
					}
				});
			},
			store(e) {
				var that = this
				this.editorCtx.getContents({
					success: function(res) {
						e.currentTarget.id == 1 ? console.log('保存内容:', res.html) : uni.navigateTo({
							url: `../preview/preview?rich=${encodeURIComponent(res.html)}`
						});
						that.forumContent = res.html
					}
				});
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success");
					}
				});
			},
			removeFormat() {
				this.editorCtx.removeFormat();
			},
			insertDate() {
				const date = new Date();
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
				this.editorCtx.insertText({
					text: formatDate
				});
			},
			insertImage() {
				// const that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uniCloud.uploadFile({
							filePath: res.tempFilePaths[0],
							cloudPath: 'a.jpg',
							success: function(res1) {
								console.log(res1)
								_self.editorCtx.insertImage({
									src: res1.fileID,
									data: {
										id: 'abcd',
										role: 'god'
									},
									width: '80%',
									success: function() {
										console.log('insert image success');
									}
								});
							}
						});

					}
				});
			},
			ForumSubmit() { //提交论坛
				uni.showLoading({
					mask: true
				})
				if (this.forumTitle != "") {
					if (this.forumContent != "") {
						uni.getStorage({
							key: 'userinfo',
							success: (res1) => {
								console.log(res1.data)
								let data = {
									email: res1.data.email,
									method: "getUserInfo"
								}
								uniCloud.callFunction({
										name: "userController",
										data: data
									})
									.then((res2) => {
										console.log(res2.result.data[0])
										var myDate = new Date()
										let forum = {
											forumTitle: this.forumTitle,
											forumClass: this.forumClass,
											forumContent: this.forumContent,
											forumCover: this.forumCover,
											userAvatar: res2.result.data[0].userAvatar,
											userName: res2.result.data[0].userName,
											email: res2.result.data[0].email,
											submitTime: myDate.getTime(),
											lookCount: 0,
											method: "uploadForum"
										}
										console.log(forum)
										uniCloud.callFunction({
												name: "forumController",
												data: forum
											})
											.then((res) => {
												uni.hideLoading()
												console.log(res)
												this.forumTitle = ""
												this.forumClass = ""
												this.forumContent = ""
												this.forumCover = ""
												uni.showToast({
													duration: 1500,
													title: '发布成功',
													mask: true,
													icon: 'none'
												})
												setTimeout(() => {
													uni.reLaunch({
														url: "../release/release"
													})
												}, 1500)
											})
											.catch((err) => {
												console.log(err)
											})
									})
									.catch((err) => {
										console.log(err)
									})
							},
							fail(err) {
								uni.showToast({
									duration: 1500,
									title: '请登录后再进行操作!',
									mask: true,
									icon: 'none'
								})
							}
						})
					} else {
						uni.showToast({
							duration: 1500,
							title: '内容不能为空!',
							mask: true,
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						duration: 1500,
						title: '标题不能为空!',
						mask: true,
						icon: 'none'
					})
				}
			},
			onClickItem(e) { //发布内容选择
				// console.log(e)
				var _this = this
				this.current = e.currentIndex
				if (this.current == 3) {
					this.initIdleClass()
					qqmapsdk = new QQMapWX({
						key: 'EISBZ-V2V34-C4GUF-D4AC6-X7YA7-H5BRJ'
					});
					qqmapsdk.reverseGeocoder({
						success: (res) => {
							_this.deliveryAddress = res.result.ad_info.province == res.result.ad_info.city ?
								res.result
								.ad_info
								.city + "/" + res.result.ad_info.district : res.result.ad_info.province + "/" +
								res
								.result.ad_info.city + "/" + res.result.ad_info.district
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}
			},
			classSelect(value, index) { //论坛类别选择
				console.log(value)
				this.classificationList[0].type = "default"
				this.classificationList[1].type = "default"
				this.classificationList[2].type = "default"
				this.classificationList[index].type = "success"
				this.forumClass = value
			},
			recruitLocationSelect(value, index) { //论坛类别选择
				console.log(value)
				this.recruitLocationList[0].type = "default"
				this.recruitLocationList[1].type = "default"
				this.recruitLocationList[2].type = "default"
				this.recruitLocationList[3].type = "default"
				this.recruitLocationList[index].type = "success"
				this.recruitLocation = value
			},
			lostClassSelect(value, index) { //论坛类别选择
				console.log(value)
				this.lostClassList[0].type = "default"
				this.lostClassList[1].type = "default"
				this.lostClassList[2].type = "default"
				this.lostClassList[3].type = "default"
				this.lostClassList[4].type = "default"
				this.lostClassList[5].type = "default"
				this.lostClassList[index].type = "success"
				this.lostClass = value
			},
			uploadSuccess(path) { //上传封面
				console.log(path.tempFilePaths[0])
				this.forumCover = path.tempFilePaths[0]
			},
			uploadSuccess1(path) { //上传认领物品图片
				console.log(path.tempFilePaths[0])
				this.recruitImg = path.tempFilePaths[0]
			},
			uploadSuccess2(path) { //上传寻物物品图片
				console.log(path.tempFilePaths[0])
				this.lostImg = path.tempFilePaths[0]
			},
			recruitClassSelect(value, index) { //论坛类别选择
				console.log(value)
				this.recruitClassList[0].type = "default"
				this.recruitClassList[1].type = "default"
				this.recruitClassList[2].type = "default"
				this.recruitClassList[3].type = "default"
				this.recruitClassList[4].type = "default"
				this.recruitClassList[5].type = "default"
				this.recruitClassList[index].type = "success"
				this.recruitClass = value
			},
			selectRecruitAddress() { //获取周边学校
				var that = this;
				qqmapsdk = new QQMapWX({
					key: 'EISBZ-V2V34-C4GUF-D4AC6-X7YA7-H5BRJ'
				});
				// 调用接口
				this.$refs.popup.open('bottom')
				qqmapsdk.search({
					keyword: '学校',
					success: function(res) {
						console.log(res.data);
						that.schoolList = res.data
					},
					fail: function(res) {
						console.log(res);
					}
				});
			},
			selectLostAddress() {
				var that = this;
				qqmapsdk = new QQMapWX({
					key: 'EISBZ-V2V34-C4GUF-D4AC6-X7YA7-H5BRJ'
				});
				// 调用接口
				this.$refs.popup1.open('bottom')
				qqmapsdk.search({
					keyword: '学校',
					success: function(res) {
						console.log(res.data);
						that.schoolList1 = res.data
					},
					fail: function(res) {
						console.log(res);
					}
				});
			},
			getSchool(title) { //选择一个学校作为定位
				this.address = title
				this.$refs.popup.close()
			},
			getSchool1(title) { //选择一个学校作为定位
				this.lostAddress = title
				this.$refs.popup1.close()
			},
			changeLog(e) {
				console.log(e)
			},
			changeLog1(e) {
				console.log(e)
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.target.value
			},
			recruitSwitchChange(e) {
				console.log(e.detail.value)
				this.isRecruitAnonymous = e.detail.value
			},
			lostSwitchChange(e) {
				console.log(e.detail.value)
				this.isLostAnonymous = e.detail.value
			},
			idleSwitchChange(e) {
				console.log(e.detail.value)
				this.isIdleAnonymous = e.detail.value
			},
			idleSwitchChange1(e) {
				console.log(e.detail.value)
				this.isFreeShipping = e.detail.value
				if (this.isFreeShipping) {
					this.shippingPrice = 0
				} else {
					this.shippingPrice = ""
				}
			},
			recruitSubmit() {
				uni.showLoading({
					mask: true
				})
				let recruitNameCheck = /^[\u4e00-\u9fa5]{1,5}$|^[\dA-Za-z_]{1,10}$/;
				if (recruitNameCheck.test(this.recruitName)) {
					// if (this.address != "未选择") {
					if (this.detailedAddress != "") {
						if (this.datetimesingle != "") {
							if (this.contactInformation != "") {
								uni.getStorage({
									key: 'userinfo',
									success: (res1) => {
										console.log(res1.data)
										let data = {
											email: res1.data.email,
											method: "getUserInfo"
										}
										uniCloud.callFunction({
												name: "userController",
												data: data
											})
											.then((res2) => {
												console.log(res2.result.data[0])
												var myDate = new Date()
												let recruit = {
													recruitName: this.recruitName,
													recruitClass: this.recruitClass,
													recruitImg: this.recruitImg,
													address: this.address,
													detailedAddress: this.detailedAddress,
													datetimesingle: this.datetimesingle,
													contactInformationMode: this.array[this
														.index],
													contactInformation: this
														.contactInformation,
													isRecruitAnonymous: this
														.isRecruitAnonymous,
													recruitRemarks: this.recruitRemarks,
													recruitLocation: this.recruitLocation,
													recruitState: 0,
													userAvatar: res2.result.data[0].userAvatar,
													userName: res2.result.data[0].userName,
													email: res2.result.data[0].email,
													submitTime: myDate.getTime(),
													method: "uploadRecruit"
												}
												console.log(recruit)
												uniCloud.callFunction({
														name: "recruitController",
														data: recruit
													})
													.then((res) => {
														uni.hideLoading()
														console.log(res)
														// this.recruitName = ""
														// this.recruitClass = ""
														// this.recruitImg = ""
														// this.address = ""
														// this.detailedAddress = ""
														// this.datetimesingle = ""
														// this.contactInformation = ""
														// this.recruitRemarks = ""
														// this.recruitLocation = ""
														uni.showToast({
															duration: 1500,
															title: '发布成功',
															mask: true,
															icon: 'none'
														})
														setTimeout(() => {
															uni.reLaunch({
																url: "../release/release"
															})
														}, 1500)
													})
													.catch((err) => {
														console.log(err)
													})
											})
											.catch((err) => {
												console.log(err)
											})
									},
									fail(err) {
										uni.showToast({
											duration: 1500,
											title: '请登录后再进行操作!',
											mask: true,
											icon: 'none'
										})
									}
								})
							} else {
								uni.showToast({
									duration: 1500,
									title: '请输入联系方式',
									mask: true,
									icon: 'none'
								})
							}
						} else {
							uni.showToast({
								duration: 1500,
								title: '请选择拾到时间',
								mask: true,
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							duration: 1500,
							title: '请输入详细位置',
							mask: true,
							icon: 'none'
						})
					}
					// } else {
					// 	uni.showToast({
					// 		duration: 1500,
					// 		title: '请选择定位学校',
					// 		mask: true,
					// 		icon: 'none'
					// 	})
					// }
				} else if (this.recruitName == "") {
					uni.showToast({
						duration: 1500,
						title: '名称不能为空!',
						mask: true,
						icon: 'none'
					})
				} else {
					uni.showToast({
						duration: 1500,
						title: '名称不得超过10个字节',
						mask: true,
						icon: 'none'
					})
				}
			},
			LostSubmit() {
				uni.showLoading({
					mask: true
				})
				let lostNameCheck = /^[\u4e00-\u9fa5]{1,5}$|^[\dA-Za-z_]{1,10}$/;
				if (lostNameCheck.test(this.lostName)) {
					// if (this.lostAddress != "未选择") {
					if (this.lostDetailedAddress != "") {
						if (this.lostDatetimesingle != "") {
							if (this.lostContactInformation != "") {
								uni.getStorage({
									key: 'userinfo',
									success: (res1) => {
										console.log(res1.data)
										let data = {
											email: res1.data.email,
											method: "getUserInfo"
										}
										uniCloud.callFunction({
												name: "userController",
												data: data
											})
											.then((res2) => {
												console.log(res2.result.data[0])
												var myDate = new Date()
												let lostItem = {
													lostName: this.lostName,
													lostClass: this.lostClass,
													lostImg: this.lostImg,
													lostAddress: this.lostAddress,
													lostDetailedAddress: this
														.lostDetailedAddress,
													lostDatetimesingle: this
														.lostDatetimesingle,
													lostContactInformationMode: this.array1[
														this
														.index1],
													lostContactInformation: this
														.lostContactInformation,
													isLostAnonymous: this.isLostAnonymous,
													LostRemarks: this.LostRemarks,
													lostState: 0,
													userAvatar: res2.result.data[0].userAvatar,
													userName: res2.result.data[0].userName,
													email: res2.result.data[0].email,
													submitTime: myDate.getTime(),
													method: "uploadLostItem"
												}
												console.log(lostItem)
												uniCloud.callFunction({
														name: "lostController",
														data: lostItem
													})
													.then((res) => {
														uni.hideLoading()
														console.log(res)
														uni.showToast({
															duration: 1500,
															title: '发布成功',
															mask: true,
															icon: 'none'
														})
														setTimeout(() => {
															uni.reLaunch({
																url: "../release/release"
															})
														}, 1000)
													})
													.catch((err) => {
														console.log(err)
													})
											})
											.catch((err) => {
												console.log(err)
											})
									},
									fail(err) {
										uni.showToast({
											duration: 1500,
											title: '请登录后再进行操作!',
											mask: true,
											icon: 'none'
										})
									}
								})
							} else {
								uni.showToast({
									duration: 1500,
									title: '请输入联系方式',
									mask: true,
									icon: 'none'
								})
							}
						} else {
							uni.showToast({
								duration: 1500,
								title: '请选择丢失时间',
								mask: true,
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							duration: 1500,
							title: '请输入详细位置',
							mask: true,
							icon: 'none'
						})
					}
					// } else {
					// 	uni.showToast({
					// 		duration: 1500,
					// 		title: '请选择定位学校',
					// 		mask: true,
					// 		icon: 'none'
					// 	})
					// }
				} else if (this.lostName == "") {
					uni.showToast({
						duration: 1500,
						title: '名称不能为空!',
						mask: true,
						icon: 'none'
					})
				} else {
					uni.showToast({
						duration: 1500,
						title: '名称不得超过10个字节',
						mask: true,
						icon: 'none'
					})
				}
			},
			initIdleClass() {
				uni.showLoading({
					mask: true
				})
				let data = {
					method: "initIdleClass"
				}
				uniCloud.callFunction({
						name: "idleClassController",
						data: data
					})
					.then((res) => {
						uni.hideLoading()
						console.log(res)
						this.classList = res.result.data
					})
					.catch((err) => {
						console.log(err)
					})
			},
			onchange(e) {
				const value = e.detail.value
				console.log(e)
				this.oneClass = e.detail.value[0].value
				this.twoClass = e.detail.value[1].value
				this.threeClass = e.detail.value[2].value
			},
			onnodeclick(node) {
				console.log(node)
			},
			onchange1(e) {
				const value = e.detail.value
				console.log(e)
				this.quality = e.detail.value
			},
			onnodeclick1(node) {
				console.log(node)
			},
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log(this.idleImageList)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			uploadVideo() {
				console.log('上传成功')
				console.log(this.idleVideo)
			},
			selectAddress() {
				uni.navigateTo({
					url: "../selectAddress/selectAddress?address=" + this.deliveryAddress
				})
			},
			idleSubmit() {
				uni.showLoading({
					mask: true
				})
				let idleNameCheck = /^[\u4e00-\u9fa5]{1,5}$|^[\dA-Za-z_]{1,10}$/;
				if (idleNameCheck.test(this.idleName)) {
					if (this.oneClass != 0 && this
						.twoClass != 0 && this.threeClass != 0) {
						if (this.quality != "") {
							if (this.idleDescribe != "") {
								if (this.idlePrice != "") {
									if (this.stockCount != "") {
										if (this.isFreeShipping || this.shippingPrice != "") {
											if (this.idleImageList.length != 0) {
												if (this.idleContactInformation != "") {
													uni.getStorage({
														key: 'userinfo',
														success: (res1) => {
															console.log(res1.data)
															let data = {
																email: res1.data.email,
																method: "getUserInfo"
															}
															uniCloud.callFunction({
																	name: "userController",
																	data: data
																})
																.then((res2) => {
																	var myDate = new Date()
																	let idleInfo = {
																		idleName: this.idleName,
																		oneClass: this.oneClass,
																		twoClass: this.twoClass,
																		threeClass: this.threeClass,
																		quality: this.quality[0].text,
																		idleDescribe: this
																			.idleDescribe,
																		idlePrice: parseFloat(this
																				.idlePrice) +
																			parseFloat(this
																				.shippingPrice),
																		isFreeShipping: this
																			.isFreeShipping,
																		shippingPrice: parseFloat(this
																			.shippingPrice),
																		idleImageList: this
																			.idleImageList,
																		idleVideo: this.idleVideo,
																		deliveryAddress: this
																			.deliveryAddress,
																		idleContactInformationMode: this
																			.array2[this.index2],
																		idleContactInformation: this
																			.idleContactInformation,
																		isIdleAnonymous: this
																			.isIdleAnonymous,
																		idleTradingState: 0,
																		userAvatar: res2.result.data[0]
																			.userAvatar,
																		userName: res2.result.data[0]
																			.userName,
																		email: res2.result.data[0]
																			.email,
																		submitTime: myDate.getTime(),
																		lookCount: 0,
																		stockCount: parseInt(this
																			.stockCount),
																		method: "uploadIdle"
																	}
																	console.log(idleInfo)
																	uniCloud.callFunction({
																			name: "idleController",
																			data: idleInfo
																		})
																		.then((res) => {
																			uni.hideLoading()
																			console.log(res)
																			if (res.result.id) {
																				uni.showToast({
																					duration: 1500,
																					title: '发布成功',
																					mask: true,
																					icon: 'none'
																				})
																				setTimeout(() => {
																					uni.reLaunch({
																						url: "../release/release"
																					})
																				}, 1000)
																			} else {
																				uni.showToast({
																					duration: 1500,
																					title: '发布失败',
																					mask: true,
																					icon: 'none'
																				})
																			}
																		})
																		.catch((err) => {
																			console.log(err)
																		})
																})
																.catch((err) => {
																	console.log(err)
																})
														},
														fail(err) {
															uni.showToast({
																duration: 1500,
																title: '请登录后再进行操作!',
																mask: true,
																icon: 'none'
															})
														}
													})
												} else {
													uni.showToast({
														duration: 1500,
														title: '请输入联系方式！',
														mask: true,
														icon: 'none'
													})
												}
											} else {
												uni.showToast({
													duration: 1500,
													title: '请至少上传一张图片！',
													mask: true,
													icon: 'none'
												})
											}
										} else {
											uni.showToast({
												duration: 1500,
												title: '请输入邮费或者选择包邮！',
												mask: true,
												icon: 'none'
											})
										}
									} else {
										uni.showToast({
											duration: 1500,
											title: '库存不能为空！',
											mask: true,
											icon: 'none'
										})
									}
								} else {
									uni.showToast({
										duration: 1500,
										title: '价格不能为空！',
										mask: true,
										icon: 'none'
									})
								}
							} else {
								uni.showToast({
									duration: 1500,
									title: '描述不能为空！',
									mask: true,
									icon: 'none'
								})
							}
						} else {
							uni.showToast({
								duration: 1500,
								title: '请选择成色！',
								mask: true,
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							duration: 1500,
							title: '请选择分类！',
							mask: true,
							icon: 'none'
						})
					}
				} else if (this.idleName == "") {
					uni.showToast({
						duration: 1500,
						title: '名称不能为空!',
						mask: true,
						icon: 'none'
					})
				} else {
					uni.showToast({
						duration: 1500,
						title: '名称不得超过10个字节',
						mask: true,
						icon: 'none'
					})
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../common/assets/editor.css"
</style>
