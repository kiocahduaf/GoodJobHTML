
layui.define(['form', 'upload'], function(exports){
  var $ = layui.$
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,setter = layui.setter
  ,view = layui.view
  ,admin = layui.admin
  ,form = layui.form
  ,upload = layui.upload;


    //房屋安全鉴定申请表图片上传
    var houseSecurityAppraisalApplyImgView = $('#houseSecurityAppraisalApplyImgs')
        ,uploadListIns = upload.render({
        elem: '#houseSecurityAppraisalApplyImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 1
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#houseSecurityAppraisalApplyImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs houseSecurityAppraisalApply-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger houseSecurityAppraisalApply-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.houseSecurityAppraisalApply-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.houseSecurityAppraisalApply-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                houseSecurityAppraisalApplyImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = houseSecurityAppraisalApplyImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = houseSecurityAppraisalApplyImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.houseSecurity-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //产权证件图片上传
    var propertyImgView = $('#propertyImgs')
        ,uploadListIns = upload.render({
        elem: '#propertyImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 2
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#propertyImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs property-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger property-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.property-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.property-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                propertyImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = propertyImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = propertyImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.property-reload').removeClass('layui-hide'); //显示重传
        }
    });


    //租房合同图片上传
    var leaseImgView = $('#leaseImgs')
        ,uploadListIns = upload.render({
        elem: '#leaseImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 3
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#leaseImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs lease-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger lease-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.lease-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.lease-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                leaseImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = leaseImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = leaseImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.lease-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //建筑、结构图纸上传
    var buildingImgView = $('#buildingImgs')
        ,uploadListIns = upload.render({
        elem: '#buildingImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 4
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#buildingImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs building-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger building-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.building-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.building-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                buildingImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = buildingImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = buildingImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.building-reload').removeClass('layui-hide'); //显示重传
        }
    });


    //工程竣工资料上传
    var projectCompletedImgView = $('#projectCompletedImgs')
        ,uploadListIns = upload.render({
        elem: '#projectCompletedImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 5
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#projectCompletedImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs projectCompleted-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger projectCompleted-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.projectCompleted-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.projectCompleted-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                projectCompletedImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = projectCompletedImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = projectCompletedImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.projectCompleted-reload').removeClass('layui-hide'); //显示重传
        }
    });


    //检测报告图片上传
    var inspectionReportImgView = $('#inspectionReportImgs')
        ,uploadListIns = upload.render({
        elem: '#inspectionReportImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 6
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#inspectionReportImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs inspectionReport-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger inspectionReport-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.inspectionReport-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.inspectionReport-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                inspectionReportImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = inspectionReportImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = inspectionReportImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.inspectionReport-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //房屋现状图片上传
    var houseSituationImgView = $('#houseSituationImgs')
        ,uploadListIns = upload.render({
        elem: '#houseSituationImg'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 11
        }
        ,url: setter.baseProject + '/api/upload/'
        ,accept: 'images'
        ,multiple: true
        ,auto: false
        ,size: 0
        ,bindAction: '#houseSituationImgUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs houseSituationImg-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger houseSituationImg-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.houseSituationImg-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.houseSituationImg-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                houseSituationImgView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = houseSituationImgView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = houseSituationImgView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.houseSituationImg-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //鉴定方案上传
    var appraisalSchemeFileView = $('#appraisalSchemeFiles')
        ,uploadListIns = upload.render({
        elem: '#appraisalSchemeFile'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 7
        }
        ,url: layui.setter.baseProject + '/api/upload/'
        ,accept: 'file'
        ,multiple: false
        ,auto: false
        ,size: 0
        ,bindAction: '#appraisalSchemeFileUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs appraisalSchemeFile-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger appraisalSchemeFile-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.appraisalSchemeFile-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.appraisalSchemeFile-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                appraisalSchemeFileView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = appraisalSchemeFileView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = appraisalSchemeFileView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.appraisalSchemeFile-reload').removeClass('layui-hide'); //显示重传
        }
    });


    //鉴定报告上传
    var appraisalReportFileView = $('#appraisalReportFiles')
        ,uploadListIns = upload.render({
        elem: '#appraisalReportFile'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 10
        }
        ,url: layui.setter.baseProject + '/api/upload/'
        ,accept: 'file'
        ,multiple: false
        ,auto: false
        ,size: 0
        ,bindAction: '#appraisalReportFileUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs appraisalReportFile-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger appraisalReportFile-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.appraisalReportFile-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.appraisalReportFile-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                appraisalReportFileView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = appraisalReportFileView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = appraisalReportFileView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.appraisalReportFile-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //检测方案上传
    var detectionSchemeFileView = $('#detectionSchemeFiles')
        ,uploadListIns = upload.render({
        elem: '#detectionSchemeFile'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 8
        }
        ,url: layui.setter.baseProject + '/api/upload/'
        ,accept: 'file'
        ,multiple: false
        ,auto: false
        ,size: 0
        ,bindAction: '#detectionSchemeFileUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs detectionSchemeFile-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger detectionSchemeFile-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.detectionSchemeFile-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.detectionSchemeFile-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                detectionSchemeFileView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = detectionSchemeFileView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = detectionSchemeFileView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.detectionSchemeFile-reload').removeClass('layui-hide'); //显示重传
        }
    });


    //检测报告上传
    var detectionReportFileView = $('#detectionReportFiles')
        ,uploadListIns = upload.render({
        elem: '#detectionReportFile'
        ,headers: {"Authorization": layui.data(layui.setter.tableName)["Authorization"]}
        ,data:{
            "type": 9
        }
        ,url: layui.setter.baseProject + '/api/upload/'
        ,accept: 'file'
        ,multiple: false
        ,auto: false
        ,size: 0
        ,bindAction: '#detectionReportFileUpload'
        ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layui.layer.load(); //上传loading
        }
        ,choose: function(obj){
            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
            //读取本地文件
            obj.preview(function(index, file, result){
                var tr = $(['<tr id="upload-'+ index +'">'
                    ,'<td>'+ file.name +'</td>'
                    ,'<td>等待上传</td>'
                    ,'<td>'
                    ,'<button class="layui-btn layui-btn-xs detectionReportFile-reload layui-hide">重传</button>'
                    ,'<button class="layui-btn layui-btn-xs layui-btn-danger detectionReportFile-delete">删除</button>'
                    ,'</td>'
                    ,'</tr>'].join(''));

                //单个重传
                tr.find('.detectionReportFile-reload').on('click', function(){
                    obj.upload(index, file);
                });

                //删除
                tr.find('.detectionReportFile-delete').on('click', function(){
                    delete files[index]; //删除对应的文件
                    tr.remove();
                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                });

                detectionReportFileView.append(tr);
            });
        }
        ,done: function(res, index, upload){
            layer.closeAll('loading'); //关闭loading
            if(res.code == 0){ //上传成功
                var tr = detectionReportFileView.find('tr#upload-'+ index)
                    ,tds = tr.children();
                tr.attr("data-attid", res.data.id);
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                tds.eq(2).html('<a class="layui-btn layui-btn-primary" href="'+layui.setter.baseFileURL + res.data.url+'" target="_blank">查看</a><button class="layui-btn layui-btn-danger" onclick="delAttr(this);">删除</button>'); //清空操作
                return delete this.files[index]; //删除文件队列已经上传成功的文件
            }
            this.error(index, upload);
        }
        ,error: function(index, upload){
            var tr = detectionReportFileView.find('tr#upload-'+ index)
                ,tds = tr.children();
            tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
            tds.eq(2).find('.detectionReportFile-reload').removeClass('layui-hide'); //显示重传
        }
    });

    //对外暴露的接口
  exports('applyUpload', {});
});