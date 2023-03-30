const deepClone = (source, optionsObject = {}, target, sourceArray = [source], targetArray, circularObjectsMap = new Map()) => {
	if (source != undefined) {
		if (target == undefined) {
			switch (Object.prototype.toString.call(source)) {
				case '[object Map]':
					target = new Map();
					break;
				case '[object Array]':
					target = [];
					break;
				case '[object Set]':
					target = new Set();
					break;
				case '[object Object]':
					target = {};
					break;
				default:
					return source;
			}
			targetArray = [target];
		}
		let sourceObjectsArray = [];
		let targetObjectsArray = [];

		for (let j = 0, jLen = sourceArray.length; j < jLen; j++) {
			let keys = sourceArray[j];
			let sourceType = Object.prototype.toString.call(sourceArray[j]);
			if (sourceType === '[object Object]') keys = Object.keys(sourceArray[j]);

			for (let key of keys) {
				let value;
				if (sourceType === '[object Array]') value = key;
				else if (sourceType === '[object Map]') [key, value] = key;
				else if (sourceType === '[object Set]') value = key;
				else value = sourceArray[j][key];

				let isPrimitiveType = value == undefined || (typeof value !== 'object' && typeof value !== 'function');
				let newValue = value;

				if (circularObjectsMap.has(value) === true) {
					newValue = circularObjectsMap.get(value);
				} else {
					if (isPrimitiveType === false) {
						let propertyType = Object.prototype.toString.call(value);

						switch (propertyType) {
							case '[object Object]':
								newValue = {};
								sourceObjectsArray.push(value);
								targetObjectsArray.push(newValue);
								break;
							case '[object Array]':
								newValue = [];
								sourceObjectsArray.push(value);
								targetObjectsArray.push(newValue);
								break;
							case '[object Map]':
								newValue = new Map();
								sourceObjectsArray.push(value);
								targetObjectsArray.push(newValue);
								break;
							case '[object Set]':
								newValue = new Set();
								sourceObjectsArray.push(value);
								targetObjectsArray.push(newValue);
								break;
							case '[object File]':
								newValue = new File([value], value.name, { type: value.type });
								break;
							case '[object Blob]':
								newValue = new Blob([value], { type: value.type });
								break;
							default:
								newValue = undefined;
						}
						if (newValue != undefined) circularObjectsMap.set(value, newValue);
					}
				}

				if (sourceType === '[object Array]') targetArray[j].push(newValue);
				else if (sourceType === '[object Map]') targetArray[j].set(key, newValue);
				else if (sourceType === '[object Set]') targetArray[j].add(newValue);
				else targetArray[j][key] = newValue;
			}
			if (optionsObject.freeze === true) Object.freeze(target[j]);
		}
		if (sourceObjectsArray.length === 0) {
			return target;
		} else {
			return deepClone(source, optionsObject, target, sourceObjectsArray, targetObjectsArray, circularObjectsMap);
		}
	}
};

export { deepClone };
