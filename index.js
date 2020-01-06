function formatDate(date, fmt) {
	if (typeof date == 'string') {
		return date;
	}

	if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

	if (!date || date == null) return null;
	var o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[
			k]).substr(('' + o[k]).length)))
	}
	return fmt
}

module.exports = {
	book: {
		assets: './assets',
		css: [
			'footer.css'
		],
	},
	hooks: {
		'page:before': function(page) {
			var _label = '文件修订时间:',
				_format = 'YYYY-MM-DD HH:mm:ss',
				_copy = 'Copyright © 54dxs.cn 2020 all right reserved，powered by 深情小建'
			if (this.options.pluginsConfig['pagefooter']) {
				_label = this.options.pluginsConfig['pagefooter']['modify_label'] || _label;
				_format = this.options.pluginsConfig['pagefooter']['modify_format'] || _format;
				_copy = this.options.pluginsConfig['pagefooter']['copyright'] || _copy;
			}
			var _copy = '<span class="copyright">' + _copy + '</span>';
			var str = ' \n\n<footer class="page-footer">' + _copy +
				'<span class="footer-modification">' +
				_label +
				'\n{{file.mtime | date("' + _format +
				'")}}\n</span></footer>'
			page.content = page.content + str;
			return page;
		}
	},
	filters: {
		date: function(d, format) {
			return formatDate(d, format);
		}
	}
};
