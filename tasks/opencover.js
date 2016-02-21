exports.wrapCommand = function(command, options) {

  var pathToOpencover = options.coverPath;
  var wrappedArgs = [];
  
  var addOption = function (propertyName, propertyNameCommand, defaultValue) {
    if (options[propertyName] && options[propertyName] !== '') {
      wrappedArgs.push('' + propertyNameCommand + ':"' + options[propertyName] + '"');
      return;
    }

    if (defaultValue) {
      wrappedArgs.push('' + propertyNameCommand + ':' + defaultValue);
    }
  };

  wrappedArgs.push('-target:"' + command.path + '"');
  wrappedArgs.push('-targetargs:"' + command.args.join(' ') + '"');
  wrappedArgs.push('-register:user');
  wrappedArgs.push('-returntargetcode');
  
  addOption('coverReportFilePath', '-output', '_CodeCoverageResult.xml');
  addOption('coverFilter', '-filter');
  addOption('coverExcludeAttributeFilter', '-excludebyattribute');

  return {
    path: pathToOpencover,
    args: wrappedArgs
  };
};